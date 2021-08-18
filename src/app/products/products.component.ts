import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: any;

	loadingProductsFromApi: boolean = true;

	filterByCategory: any;

	searchQuery: any;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute,
		private apiService: ApiService,
		private location: Location
	) { }

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if(data.filterByCategory) {
				this.route.params.subscribe(param => {
					this.getProducts(param.category);
					this.filterByCategory = param.category
				})
			}
			else if(this.location.path().includes("/products/search/")) {
				this.route.params.subscribe(param => {
					this.searchQuery = param.query;
					this.searchProducts(this.searchQuery);
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

	searchProducts(query: string) {
		this.loadingProductsFromApi = true;
		this.productService.searchProducts(query).subscribe(response => {
			if(response.success) {
				this.products = response.data;
				this.loadingProductsFromApi = false
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

}
