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
import {DialogService} from "./services/dialog.service";
import { DiscountedPricePipe } from './pipes/discounted-price.pipe';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { CheckoutComponent } from './checkout/checkout.component';
import {SessionService} from "./services/session.service";
import { PaymentComponent } from './payment/payment.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import {UserService} from "./services/user.service";
import { RegistrationDoneComponent } from './registration-done/registration-done.component';

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
		RegisterComponent,
		DiscountedPricePipe,
		Nl2brPipe,
		CheckoutComponent,
  PaymentComponent,
  CheckoutCompleteComponent,
  RegistrationDoneComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [ProductService, CartService, ApiService, DialogService, SessionService, UserService],
	bootstrap: [AppComponent]
})
export class AppModule { }
