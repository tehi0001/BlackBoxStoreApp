import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ApiService} from "../services/api.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {

	loadingProductsFromApi: boolean = true;

	newArrivals: any;

	constructor(
		private productService: ProductService,
		private apiService: ApiService,
		public cartService: CartService
	) {
		this.getProducts();
	}

	ngOnInit(): void {
	}

	getProducts(): void {
		this.loadingProductsFromApi = true;

		this.productService.getNewArrivals().subscribe(response => {
			if(response.success) {
				this.newArrivals = response.data;

				this.loadingProductsFromApi = false;
			}

		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

}
