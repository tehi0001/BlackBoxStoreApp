import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Location} from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: any;

	allProducts: any;

	loadingProductsFromApi: boolean = true;

	filterByCategory: any;

	searchQuery: any;

	isFiltered: boolean = true;

	filterForm: FormGroup = new FormGroup({
		minPrice: new FormControl(''),
		maxPrice: new FormControl(''),
		inStock: new FormControl('')
	});

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
				this.allProducts = this.products;
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
				this.allProducts = this.products;
				this.loadingProductsFromApi = false
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

	filter() {
		let filters = this.filterForm.value;
		let minPrice = parseInt(filters.minPrice);
		let maxPrice = parseInt(filters.maxPrice);
		let inStock = parseInt(filters.inStock);

		if(filters.minPrice == null && filters.maxPrice == null && filters.inStock == null) {			
			this.clearFilters();
		}
		else {
			let filteredProducts = _.filter(this.allProducts, product => {
				let condition = true;

				if(minPrice > 0) {
					condition = condition && product.price >= minPrice;
				}

				if(maxPrice > 0) {
					condition = condition && product.price <= maxPrice;
				}

				if(inStock == 1) {
					condition = condition && product.stock > 0
				}
				else if(inStock == 2) {
					condition = condition && product.stock == 0
				}

				this.isFiltered = true;

				return condition;
			});

			this.products = filteredProducts;
		}

		
		//console.log(filteredProducts);
			
	}

	clearFilters() {
		this.products = this.allProducts;
		this.filterForm.reset();
		this.isFiltered = false;
	}

}
