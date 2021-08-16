import { Injectable } from '@angular/core';
import {DialogService} from "./dialog.service";
import {lt} from "lodash";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../config";

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
		private dialogService: DialogService,
		private http: HttpClient
	) {
		let storedCart = localStorage.getItem("cart");
		if(storedCart !== null) {
			this.cart = JSON.parse(storedCart);
		}
		//localStorage.clear(); //TODO
	}

	addItem(productId: number, productName: string, quantity: number = 1, options?: any): void {
		let itemExist = false;
		this.cart.forEach((item, index) => {
			if(item.productId === productId) {
				itemExist = true;
				this.cart[index].quantity += quantity;
			}
		})

		if(!itemExist) {
			this.cart.push({
				productId: productId,
				quantity: quantity,
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

	getItemCount(): number {
		return this.cart.length;
	}

	getItemsData(): Observable<any> {
		return this.http.post(API_URL + "/get-cart-data", {cart: this.cart});
	}
}
