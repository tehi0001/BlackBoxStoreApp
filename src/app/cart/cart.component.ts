import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from "../services/cart.service";
import {ApiService} from "../services/api.service";
import {findIndex, sumBy} from "lodash";

interface CartItem {
	id: number,
	name: string,
	price: number,
	quantity: number,
	image: string,
	options?: any
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	loadingCartDataFromApi: boolean = true;

	subTotal: number = 0;

	shippingCost: number = 0;

	orderTotal: number = 0;

	// @ts-ignore
	cart: CartItem[];

	// @ts-ignore
	@Output() onNav: EventEmitter<any> = new EventEmitter<any>();

	// @ts-ignore
	@Output() onCheckout: EventEmitter<any> = new EventEmitter<any>();

	@Output() dataLoaded: EventEmitter<any> = new EventEmitter<any>();

	// @ts-ignore
	@Input() loadOnInit: boolean;

	// @ts-ignore
	@Input() disableContinueButton: boolean;

	// @ts-ignore
	@Input() disableCart: boolean;

	showShippingCost: boolean = true;

	constructor(
		public cartService: CartService,
		private apiService: ApiService
	) {}

	ngOnInit(): void {
		if(this.loadOnInit) {
			this.getItemsData();
		}
    }


	getItemsData():void {
		this.loadingCartDataFromApi = true;
		if(this.cartService.getItemCount() > 0) {
			this.cartService.getItemsData().subscribe(response => {
				if(response.success) {
					this.cart = response.data;
					this.updateCartTotal();
					this.loadingCartDataFromApi = false
					this.dataLoaded.emit();
				}
			}, error => {
				this.apiService.handleHttpErrors(error);
				this.loadingCartDataFromApi = false
			})
		}
	}

	updateQuantity(id: any, type: "increase" | "decrease") {
		let index = findIndex(this.cart, (item) => {
			return item.id == id
		});

		type == "increase" ? this.cart[index].quantity++ : this.cart[index].quantity--;

		if(this.cart[index].quantity == 0) {
			this.cart.splice(index, 1);
		}

		this.updateCartTotal();

		this.cartService.updateQuantity(index, type === "increase");
	}

	updateCartTotal() {
		this.subTotal = sumBy(this.cart, item => {
			return item.price * item.quantity;
		})


		if(this.showShippingCost) {
			this.orderTotal = Number(this.subTotal) + Number(this.shippingCost);
		}
		else {
			this.orderTotal = this.subTotal;
		}
	}

}
