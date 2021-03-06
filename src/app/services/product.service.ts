import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URL, NEW_ARRIVALS_LIMIT} from "../config";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	constructor(
		private http: HttpClient
	) { }

	getProductCategories(): Observable<any> {
		return this.http.get(API_URL + "/product-categories")
	}

	getProducts(filter?: string): Observable<any> {
		let endpoint;

		if(filter) {
			endpoint = "/products/by-category/" + filter;
		}
		else {
			endpoint = "/products";
		}

		return this.http.get(API_URL + endpoint);
	}

	searchProducts(query: string): Observable<any> {
		return this.http.post(API_URL + "/search-products", {
			query: query
		});
	}

	getProduct(id: number): Observable<any> {
		return this.http.get(API_URL + "/products/" + id);
	}

	getNewArrivals(): Observable<any> {
		return this.http.get(API_URL + "/new-arrivals/" + NEW_ARRIVALS_LIMIT);
	}

}
