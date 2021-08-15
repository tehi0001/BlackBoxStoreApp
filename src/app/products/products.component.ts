import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: any;

	loadingProductsFromApi: boolean = true;

	filterByCategory: any;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private apiService: ApiService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if(data.filterByCategory) {
				this.route.params.subscribe(param => {
					this.getProducts(param.category);
					this.filterByCategory = param.category
				})
			}
			else {
				this.getProducts();
			}
		})
	}

	getProducts(category?: string): void {
		this.loadingProductsFromApi = true;

		this.productService.getProducts(category).subscribe(response => {
			if(response.success) {
				this.products = response.data;
				this.loadingProductsFromApi = false
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

}
