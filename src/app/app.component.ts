import { Component } from '@angular/core';
import {ProductService} from "./services/product.service";
import {ApiService} from "./services/api.service";
import {CartService} from "./services/cart.service";

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
		public cartService: CartService
	) {
		this.getProductCategories();
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
