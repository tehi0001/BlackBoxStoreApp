import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
	) { }

	paymentSuccessful: boolean = false;

	ngOnInit(): void {
		this.route.data.subscribe(data => {
			if(data.paymentSuccessful) {
				this.paymentSuccessful = true;
			}
		})
	}

}
