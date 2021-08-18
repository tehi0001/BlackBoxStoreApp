import {Component, ViewChild} from '@angular/core';
import {ProductService} from "./services/product.service";
import {ApiService} from "./services/api.service";
import {CartService} from "./services/cart.service";
import {UserService} from "./services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ProductsComponent} from "./products/products.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	productCategories: any;

	loadingProductCategories: boolean = true;

	searchForm: FormGroup;

	// @ts-ignore
	@ViewChild(ProductsComponent) products: ProductsComponent

	constructor(
		private productService: ProductService,
		private apiService: ApiService,
		public cartService: CartService,
		public userService: UserService,
		private router: Router,
		private location: Location
	) {
		this.getProductCategories();

		if(userService.activeSession !== null) {
			userService.restoreSession();
		}

		this.searchForm = new FormGroup({
			query: new FormControl('')
		})
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

	search(): void {
		let query = this.searchForm.value.query;

		if(query !== "") {

			if(this.location.path().includes("/products/search/")) {
				this.router.navigate(['/products']).then(() => {
					this.router.navigate(['/products/search/' + query]);
				})

			}

			this.router.navigate(['/products/search/' + query], {
				state: {searchQuery: query}
			})
		}
	}
}
