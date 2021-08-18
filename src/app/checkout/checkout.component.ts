import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PROVINCES} from "../config";
import {CartService} from "../services/cart.service";
import {ApiService} from "../services/api.service";
import {findIndex} from "lodash";
import {CartComponent} from "../cart/cart.component";
import {Location} from "@angular/common";
import {SessionService} from "../services/session.service";
import {Router} from "@angular/router";

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

	// @ts-ignore
	@ViewChild(CartComponent) cart: CartComponent

	constructor(
		private cartService: CartService,
		private apiService: ApiService,
		private location: Location,
		private sessionService: SessionService,
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
			email: new FormControl('', [Validators.required]),
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
			if(state.noAuth && !this.sessionService.isActive) {
				this.activeForm = "billing";
			}
			else {
				this.router.navigateByUrl("/login");
			}

			this.checkoutForm.valueChanges.subscribe(() => {
				this.disableContinueButton = this.checkoutForm.invalid;
			})
		}
	}

	onFormSubmit() {
		this.disableContinueButton = true;

		if(this.activeForm == "billing") {
			this.billingInfo = this.checkoutForm.value;
			this.loadingDataFromApi = true;

			this.cartService.getShippingCosts().subscribe(response => {
				if(response.success) {
					this.shippingCategories = response.data;

					this.checkoutForm.reset();
					this.checkoutForm.clearValidators();

					this.activeForm = "shipping";

					this.loadingDataFromApi = false;

					this.cart.shippingCost = response.data[0].cost;
					this.cart.showShippingCost = true;

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
				billing: this.sessionService.isActive ? undefined : this.billingInfo,
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
