import { Component } from '@angular/core';
import {ProductService} from "./services/product.service";
import {ApiService} from "./services/api.service";
import {CartService} from "./services/cart.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'storeapp';

	productCategories: any;

	loadingProductCategories: boolean = true;

	constructor(
		private productService: ProductService,
		private apiService: ApiService,
		public cartService: CartService,
		public userService: UserService
	) {
		this.getProductCategories();

		if(userService.activeSession !== null) {
			userService.restoreSession();
		}
	}

	getProductCategories(): void {
		this.productService.getProductCategories().subscribe(response => {
			if(response.success) {
				this.productCategories = response.data;
				this.loadingProductCategories = false;
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}
}
