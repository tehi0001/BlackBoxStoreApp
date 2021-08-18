import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	private isLoggedIn: boolean = false;

	// @ts-ignore
	private sessionToken: string;

	constructor() { }

	login(token: string): void {
		this.isLoggedIn = true;
		this.sessionToken = token;
		sessionStorage.setItem("sessionToken", token);
	}

	logout(): void {
		this.isLoggedIn = false;
	}

	get token(): string | null {
		return sessionStorage.getItem("sessionToken");
	}

	get isActive(): boolean {
		return this.isLoggedIn;
	}

	get authHeader(): any {
		return {
			headers: new HttpHeaders({
				Authorization: "Bearer " + this.sessionToken
			})
		}
	}

}
