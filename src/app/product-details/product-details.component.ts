import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ApiService} from "../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

	product: any;

	loadingProductData: boolean = true;

	largeProductImageIndex: number = 0;

	productProperties: any = {
		dimensions: [],
		others: []
	}

	selectedProductProperties: { name: string, value: string}[] = [];

	// @ts-ignore
	quantityForm: FormGroup;

	constructor(
		private productService: ProductService,
		private apiService: ApiService,
		private route: ActivatedRoute,
		private cartService: CartService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(param => {
			this.getProduct(param.id);
		})

		this.quantityForm = new FormGroup({
			quantity: new FormControl('1', [Validators.required])
		})
	}

	getProduct(id: number) {
		this.productProperties.dimensions = [];
		this.productProperties.others = [];

		this.loadingProductData = true;

		this.productService.getProduct(id).subscribe(response => {
			if(response.success) {
				this.product = response.data;

				// @ts-ignore
				this.product.properties.forEach(prop => {
					if(prop.property_type == 'dimension') {
						this.productProperties.dimensions.push(prop);
					}
					else {
						this.productProperties.others.push(prop);
					}
				});

				this.groupProductProperties();

				this.loadingProductData = false;
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
			//this.router.navigateByUrl("/products");
		})
	}

	groupProductProperties(): void {
		let uniquePropNames: string[] = [];

		let groupedProps: any[] = [];

		// @ts-ignore
		this.productProperties.others.forEach(prop => {
			if(!uniquePropNames.includes(prop.property_name)) {
				uniquePropNames.push(prop.property_name);
				groupedProps.push({
					property_name: prop.property_name,
					values: []
				});
			}
		})

		// @ts-ignore
		this.productProperties.others.forEach(prop => {
			groupedProps.forEach((group, index) => {
				if(group.property_name == prop.property_name) {
					groupedProps[index]?.values.push(prop.value);
				}
			})
		})

		this.productProperties.others = groupedProps;

		// @ts-ignore
		this.productProperties.others.forEach(prop => {
			this.selectedProductProperties.push({
				name: prop.property_name,
				value: prop.values[0]
			})
		})
	}

	updateProductProperty(propertyName: string, control: any) {
		this.selectedProductProperties.forEach((prop, index) => {
			if(propertyName == prop.name) {
				prop.value = control?.value;
			}
		});
	}

	addToCart(): void {
		this.cartService.addItem(this.product.id, this.product.product_name, parseInt(this.quantityForm.value.quantity), this.selectedProductProperties);
	}

	makeArrayFromNumber(number: number) {
		return Array.from(Array(number), (_, i) => i+1)
	}

	floor(number: number) {
		return Math.floor(number);
	}
	ceil(number: number) {
		return Math.ceil(number);
	}

	getRatingsPercentage(rating: number) {
		let result: number = 0;
		// @ts-ignore
		this.product.reviews.forEach(review => {
			if(review.rating == rating) {
				result++;
			}
		})

		return (result * 100) / this.product.reviews.length;
	}
}
