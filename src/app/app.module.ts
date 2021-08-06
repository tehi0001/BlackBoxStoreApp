import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import { HomeComponent } from './home/home.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { FeaturedProductComponent } from './featured-product/featured-product.component';

@NgModule({
	declarations: [
		AppComponent,
  HomeComponent,
  PromotionsComponent,
  NewArrivalsComponent,
  FeaturedProductComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
