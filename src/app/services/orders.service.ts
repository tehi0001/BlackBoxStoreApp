import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {API_URL} from "../config";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
	constructor(
		private http: HttpClient,
		private userService: UserService
	) { }

	getAll(): Observable<any> {
		return this.http.get(API_URL + "/get-orders", this.userService.authHeader);
	}

	getOne(id: number): Observable<any> {
		return this.http.get(API_URL + "/view-order/" + id, this.userService.authHeader);
	}
}
