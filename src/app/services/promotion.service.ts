import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../config";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
	constructor(
		private http: HttpClient
	) { }

	getPromotions(): Observable<any> {
		return this.http.get(API_URL + "/promotions")
	}
}
