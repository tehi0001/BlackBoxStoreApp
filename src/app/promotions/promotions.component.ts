import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Promotion} from "../models/promotion";
import {PromotionService} from "../services/promotion.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

	@Output() loaded: EventEmitter<any> = new EventEmitter<any>();

	// @ts-ignore
	promotion: Promotion;

	constructor(
		private pService: PromotionService,
		private apiService: ApiService
	) {}

	ngOnInit(): void {
		this.pService.getPromotions().subscribe(response => {
			if(response.success) {
				if(response.data == null) {
					this.promotion = {
						url: "/products",
						image: "assets/images/default_promo.png"
					}
				}
				else{
					this.promotion = response.data;
				}

				this.loaded.emit();
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
			this.loaded.emit();
		})


	}

}
