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
import {RegistrationDoneComponent} from "./registration-done/registration-done.component";
import {LogoutComponent} from "./logout/logout.component";

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
		path: "products/search/:query",
		component: ProductsComponent,
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
		path: "logout",
		component: LogoutComponent
	},
	{
		path: "register",
		component: RegisterComponent
	},
	{
		path: "register/done",
		component: RegistrationDoneComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		onSameUrlNavigation: "reload"
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
