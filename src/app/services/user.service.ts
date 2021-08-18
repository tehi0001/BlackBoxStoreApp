import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(
		private http: HttpClient
	) { }

	register(user: any): Observable<any> {
		return this.http.post(API_URL + "/register", user);
	}
}
