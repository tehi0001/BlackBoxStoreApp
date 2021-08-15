import { Component } from '@angular/core';
import {ProductService} from "./services/product.service";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'storeapp';
	categoriesSideNavOpened: boolean = false;
	cartSideNavOpened: boolean = false;

	productCategories: any;

	loadingProductCategories: boolean = true;

	constructor(
		private productService: ProductService,
		private apiService: ApiService
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
