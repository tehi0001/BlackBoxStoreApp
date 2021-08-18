import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ApiService} from "../services/api.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {

	@Output() loaded: EventEmitter<any> = new EventEmitter<any>();

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
		this.productService.getNewArrivals().subscribe(response => {
			if(response.success) {
				this.newArrivals = response.data;
			}
			this.loaded.emit();

		}, error => {
			this.apiService.handleHttpErrors(error);
			this.loaded.emit()
		})
	}

}
