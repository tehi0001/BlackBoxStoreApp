import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	promotionsLoaded: boolean = false;

	newArrivalsLoaded: boolean = false;

	featuredProductLoaded: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

}
