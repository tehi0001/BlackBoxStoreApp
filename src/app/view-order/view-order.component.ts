import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../services/orders.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

	order: any;

	loadingOrder: boolean = true;

	constructor(
		private orderService: OrdersService,
		private route: ActivatedRoute,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(param => {
			this.orderService.getOne(param.id).subscribe(response => {
				if(response.success) {
					this.order = response.data;
					this.loadingOrder = false;
				}
			}, error => {
				this.apiService.handleHttpErrors(error);
			})
		})
	}

}
