import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {PaymentComponent} from "./payment/payment.component";
import {CheckoutCompleteComponent} from "./checkout-complete/checkout-complete.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "home",
		component: HomeComponent
	},
	{
		path: "products",
		component: ProductsComponent
	},
	{
		path: "products/:category",
		component: ProductsComponent,
		data: {filterByCategory: true}
	},
	{
		path: "view-product/:id",
		component: ProductDetailsComponent
	},
	{
		path: "checkout",
		component: CheckoutComponent
	},
	{
		path: "checkout/pay",
		component: PaymentComponent
	},
	{
		path: "checkout/pay/failed",
		component: CheckoutCompleteComponent,
		data: {paymentSuccessful: false}
	},
	{
		path: "checkout/done",
		component: CheckoutCompleteComponent,
		data: {paymentSuccessful: true}
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "register",
		component: RegisterComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		onSameUrlNavigation: "reload"
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
