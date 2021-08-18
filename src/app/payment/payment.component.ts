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

	constructor(
		private router: Router,
		private cartService: CartService,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
	}

	processPayment(paymentSuccessful: boolean): void {

		this.cartService.updatePendingOrder(paymentSuccessful).subscribe(response => {
			if(response.success) {
				if(paymentSuccessful) {
					this.cartService.clearCart();
					this.router.navigateByUrl("/checkout/done");
				}
				else {
					this.router.navigateByUrl("/checkout/pay/failed");
				}
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}
}
