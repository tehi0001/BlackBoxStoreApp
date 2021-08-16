import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from "../services/cart.service";
import {ApiService} from "../services/api.service";

interface CartItem {
	id: number,
	name: string,
	price: number,
	quantity: number,
	image: string,
	options?: any
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	loadingCartDataFromApi: boolean = true;

	// @ts-ignore
	cart: CartItem[];

	// @ts-ignore
	@Output() onNav: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		public cartService: CartService,
		private apiService: ApiService
	) {}

	ngOnInit(): void {

    }


	getItemsData():void {
		if(this.cartService.getItemCount() > 0) {
			this.cartService.getItemsData().subscribe(response => {
				if(response.success) {
					this.cart = response.data;
					console.log(this.cart);
					this.loadingCartDataFromApi = false
				}
			}, error => {
				this.apiService.handleHttpErrors(error);
				this.loadingCartDataFromApi = false
			})
		}
	}

}
