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
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ProductService} from "./services/product.service";
import {CartService} from "./services/cart.service";
import {ApiService} from "./services/api.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PromotionsComponent,
		NewArrivalsComponent,
		FeaturedProductComponent,
		ProductsComponent,
		ProductDetailsComponent,
		CartComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [ProductService, CartService, ApiService],
	bootstrap: [AppComponent]
})
export class AppModule { }
