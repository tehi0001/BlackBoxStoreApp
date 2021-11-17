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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { LogoutComponent } from './logout/logout.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import {PromotionService} from "./services/promotion.service";
import {OrdersService} from "./services/orders.service";
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ReviewProductComponent } from './review-product/review-product.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StaticPagesComponent } from './static-pages/static-pages.component';

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
  RegistrationDoneComponent,
  LogoutComponent,
  ManageOrdersComponent,
  OrderStatusPipe,
  ViewOrderComponent,
  ReviewProductComponent,
  StaticPagesComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  })
	],
	providers: [ProductService, CartService, ApiService, DialogService, SessionService, UserService, PromotionService, OrdersService],
	bootstrap: [AppComponent]
})
export class AppModule { }
