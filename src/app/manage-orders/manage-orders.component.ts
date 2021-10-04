import { Component, OnInit } from '@angular/core';
import {OrdersService} from "../services/orders.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

	orders: any;

	loadingOrders: boolean = true;

	constructor(
		private orderService: OrdersService,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
		this.orderService.getAll().subscribe(response => {
			if(response.success) {
				this.orders = response.data;
				this.loadingOrders = false;
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
		})
	}

}
