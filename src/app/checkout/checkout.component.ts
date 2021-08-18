import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_VALIDATION_REGEX, PROVINCES} from "../config";
import {CartService} from "../services/cart.service";
import {ApiService} from "../services/api.service";
import {findIndex} from "lodash";
import {CartComponent} from "../cart/cart.component";
import {Location} from "@angular/common";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

	// @ts-ignore
	activeForm: "billing" | "shipping";

	provinces: any = PROVINCES;

	billingInfo: any;
	shippingInfo: any;

	checkoutForm: FormGroup;

	disableContinueButton: boolean = true;

	disableCart: boolean = false;

	loadingDataFromApi: boolean = true;

	shippingCategories: any;

	emailLabel:string = "Email";

	// @ts-ignore
	@ViewChild(CartComponent) cart: CartComponent

	constructor(
		private cartService: CartService,
		private apiService: ApiService,
		private location: Location,
		private userService: UserService,
		private router: Router
	) {
		this.checkoutForm = new FormGroup({
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl('', [Validators.required]),
			address: new FormControl('', [Validators.required]),
			city: new FormControl('', [Validators.required]),
			postcode: new FormControl('', [Validators.required]),
			province: new FormControl('', [Validators.required]),
			phone: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_VALIDATION_REGEX)]),
			shippingCategory: new FormControl('')
		})
	}

	ngOnInit(): void {
		if(this.cartService.hasPendingOrder()) {
			this.router.navigateByUrl("/checkout/pay");
		}
		else {
			let state = this.location.getState();

			// @ts-ignore
			if(state.noAuth || this.userService.loggedIn) {
				this.activeForm = "billing";
			}
			else {
				this.router.navigate(["/login"], {
					state: {forCheckout: true}
				});
			}

			this.checkoutForm.valueChanges.subscribe(() => {
				this.disableContinueButton = this.checkoutForm.invalid;
			})
		}

		if(this.userService.loggedIn) {
			this.checkoutForm.controls.firstname.setValue(this.userService.sessionUser?.firstname);
			this.checkoutForm.controls.lastname.setValue(this.userService.sessionUser?.lastname);
			this.checkoutForm.controls.email.setValue(this.userService.sessionUser?.email);
		}
	}

	resetForm(): void {
		this.checkoutForm.reset();
		this.checkoutForm.clearValidators();
	}

	onFormSubmit() {
		this.disableContinueButton = true;

		if(this.activeForm == "billing") {
			this.billingInfo = this.checkoutForm.value;
			this.loadingDataFromApi = true;

			this.cartService.getShippingCosts().subscribe(response => {
				if(response.success) {
					this.shippingCategories = response.data;

					this.resetForm();
					this.checkoutForm.controls.email.setValidators(null);
					this.checkoutForm.controls.email.setValidators([Validators.pattern(EMAIL_VALIDATION_REGEX)]);

					this.emailLabel = "Email (optional)";

					this.activeForm = "shipping";

					this.loadingDataFromApi = false;

					this.cart.shippingCost = response.data[0].cost;
					this.cart.showShippingCost = true;

					this.checkoutForm.controls.shippingCategory.setValue(response.data[0].id);

				}
			}, error => {
				this.apiService.handleHttpErrors(error);
			})
		}
		else {
			this.loadingDataFromApi = true;
			this.disableCart = true;
			this.shippingInfo = this.checkoutForm.value;

			this.shippingInfo.shippingCost = this.cart.shippingCost;


			let order = {
				shipping: this.shippingInfo,
				billing: this.billingInfo,
				total: this.cart.orderTotal
			}

			this.cartService.checkout(order).subscribe(response => {
				if(response.success) {
					this.cartService.setPendingOrderId(response.order_id);
					this.router.navigateByUrl("/checkout/pay")
				}
			}, error => {
				this.apiService.handleHttpErrors(error);
			})
		}
	}

	toggleShippingInfo($event: any) {
		let shippitCat = this.checkoutForm.value.shippingCategory;

		if($event.checked) {
			this.checkoutForm.setValue(this.billingInfo);
			this.checkoutForm.controls.shippingCategory.setValue(shippitCat);
		}
		else {
			this.resetForm();
			this.checkoutForm.controls.shippingCategory.setValue(shippitCat);
		}
	}

	updateShippingCost() {

		let id = this.checkoutForm.value.shippingCategory;

		// @ts-ignore
		let index = findIndex(this.shippingCategories, data => {
			// @ts-ignore
			return data.id == id;
		});

		this.cart.shippingCost = this.shippingCategories[index].cost;
		this.cart.updateCartTotal();
	}
}
