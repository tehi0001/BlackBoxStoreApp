import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

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
		path: "products/:id",
		component: ProductDetailsComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
