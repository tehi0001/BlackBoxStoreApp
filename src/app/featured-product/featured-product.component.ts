import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit {

	@Output() loaded: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit(): void {
		this.loaded.emit();
	}

}
