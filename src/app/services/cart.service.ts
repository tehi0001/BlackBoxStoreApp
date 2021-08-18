import { Injectable } from '@angular/core';
import {DialogService} from "./dialog.service";
import {findIndex, lt} from "lodash";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../config";
import {SessionService} from "./session.service";

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

	// @ts-ignore
	pendingOrderId: number | undefined;

	constructor(
		private dialogService: DialogService,
		private http: HttpClient,
		private sessionService: SessionService
	) {
		let storedCart = localStorage.getItem("cart");
		if(storedCart !== null) {
			this.cart = JSON.parse(storedCart);
		}
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

	getShippingCosts(): Observable<any> {
		return this.http.get(API_URL + "/shipping-costs");
	}

	updateQuantity(index: number, increase: boolean) {
		if(increase) {
			this.cart[index].quantity++;
		}
		else {
			this.cart[index].quantity--;
			if(this.cart[index].quantity == 0) {
				this.cart.splice(index, 1);
			}
		}

		this.saveCart();
	}

	checkout(order: any): Observable<any> {
		return this.http.post(API_URL + "/checkout", {
			order: order,
			cart: this.cart
		}, (this.sessionService.isActive ? this.sessionService.authHeader : undefined));
	}

	setPendingOrderId(id: number) {
		this.pendingOrderId = id;
	}

	hasPendingOrder(): boolean {
		if(this.pendingOrderId) {
			return true;
		}

		return false;
	}

	completePendingOrder(): Observable<any> {
		return this.http.post(API_URL + "/complete-order", {id: this.pendingOrderId});
	}

	clearCart(): void {
		this.cart = [];
		localStorage.removeItem("cart");
		this.pendingOrderId = undefined;
	}
}
