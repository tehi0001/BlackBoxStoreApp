import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private isLoggedIn: boolean = false;

	// @ts-ignore
	sessionUser: {
		firstname: string,
		lastname: string,
		email: string
	} | null;


	// @ts-ignore
	token: string | null;

	constructor(
		private http: HttpClient
	) { }

	login(token: string, firstname: string, lastname: string, email: string) {
		this.token = token;
		this.isLoggedIn = true;

		this.sessionUser = {
			firstname: firstname,
			lastname: lastname,
			email: email
		}

		sessionStorage.setItem("sessionToken", token);
		sessionStorage.setItem("sessionUser", JSON.stringify(this.sessionUser));
	}

	logout() {
		sessionStorage.clear();
		this.sessionUser = null;
		this.isLoggedIn = false;
		this.token = null;
	}

	get loggedIn(): boolean {
		return this.isLoggedIn
	}

	get activeSession(): string | null {
		return sessionStorage.getItem("sessionToken");
	}

	restoreSession() {
		let token = this.activeSession

		if(token !== null) {
			// @ts-ignore
			this.sessionUser = JSON.parse(sessionStorage.getItem("sessionUser"));
			this.token = token;
			this.isLoggedIn = true;
		}
	}

	register(user: any): Observable<any> {
		return this.http.post(API_URL + "/register", user);
	}

	auth(user: any): Observable<any> {
		return this.http.post(API_URL + "/auth", user);
	}

	getUserAbbr(): string {
		// @ts-ignore
		return this.sessionUser?.firstname.substr(0, 1) + this.sessionUser?.lastname.substr(0, 1);
	}

	get authHeader(): any {
		return {
			headers: new HttpHeaders({
				Authorization: "Bearer " + this.token
			})
		}
	}
}
