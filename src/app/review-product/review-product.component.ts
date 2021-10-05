import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrdersService} from "../services/orders.service";
import {DialogService} from "../services/dialog.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.scss']
})
export class ReviewProductComponent implements OnInit {

	product: any;
	order: any;

	reviewForm: FormGroup;

	formBusy: boolean = false;

	constructor(
		private location: Location,
		private router: Router,
		private orderService: OrdersService,
		private dialog: DialogService,
		private apiService: ApiService
	) {
		this.reviewForm = new FormGroup({
			rating: new FormControl('', [Validators.required]),
			review: new FormControl('', [Validators.required])
		});
	}

	ngOnInit(): void {
		let state:any = this.location.getState();

		if(state.product && state.product) {
			this.product = state.product;
			this.order = state.order;
		}
		else {
			this.router.navigateByUrl("/account/orders");
		}
	}

	onPost() {
		this.formBusy = true;

		this.orderService.reviewProduct(this.product.id, this.reviewForm.value).subscribe(response => {
			if(response.success) {
				this.dialog.notify("Your review has been successfully posted", "success");
				this.router.navigateByUrl("/account/orders/" + this.order.id);
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

}
