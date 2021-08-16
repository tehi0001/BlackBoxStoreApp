import { Component, OnInit } from '@angular/core';
import {Promotion} from "../models/promotion";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

	promotion: Promotion = {
		image_url: "assets/dummies/promotion.png",
		promotion_url: "/products"
	};

	constructor() {}

	ngOnInit(): void {
	}

}
