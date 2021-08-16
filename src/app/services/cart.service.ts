import { Injectable } from '@angular/core';
import {DialogService} from "./dialog.service";
import {isEqual} from 'lodash';

interface CartItem {
	productId: number,
	quantity: number,
	options?: any
}

@Injectable({
	providedIn: 'root'
})
export class CartService {
	private cart: CartItem[] = [];

	constructor(
		private dialogService: DialogService
	) { }

	addItem(productId: number, productName: string, options?: any): void {
		let itemExist = false;
		this.cart.forEach((item, index) => {
			if(item.productId === productId) {
				itemExist = true;
				this.cart[index].quantity++;
			}
		})

		if(!itemExist) {
			this.cart.push({
				productId: productId,
				quantity: 1,
				options: options
			});
		}

		this.saveCart();

		this.dialogService.notify(productName + " added to your cart", "success");

		console.log(this.cart);
	}

	private saveCart(): void {
		localStorage.removeItem("cart");
		localStorage.setItem("cart", JSON.stringify(this.cart));
	}

	removeItem(productId: number) {
		this.cart.forEach((item, index) => {
			if(productId == item.productId) {
				this.cart.splice(index, 1);

			}
		})
	}
}
