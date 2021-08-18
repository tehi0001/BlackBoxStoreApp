import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

	paymentSuccessful: boolean = true;

	constructor(
		private router: Router,
		private cartService: CartService,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.processPayment();
		}, 5000);
	}

	processPayment(): void {
		if(this.paymentSuccessful) {
			this.cartService.completePendingOrder().subscribe(response => {
				if(response.success) {
					this.cartService.clearCart();
					this.router.navigateByUrl("/checkout/done");
				}
			}, error => {
				this.apiService.handleHttpErrors(error);
			})
		}
		else {
			this.router.navigateByUrl("/checkout/pay/failed");
		}
	}

}
