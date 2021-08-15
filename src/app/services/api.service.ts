import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NETWORK_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, SESSION_UNAUTHORIZED_MESSAGE} from "../config";
import {DialogService} from "./dialog.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(
		private dialogService: DialogService
	) { }

	handleHttpErrors(error: HttpErrorResponse): void {

		if(error.error instanceof ErrorEvent) { //Client side error
			this.dialogService.notify(NETWORK_ERROR_MESSAGE)
		}
		else if(error.status == 401) {
			this.dialogService.notify(SESSION_UNAUTHORIZED_MESSAGE)
			//this.router.navigateByUrl("/app/logout");
		}
		else {
			this.dialogService.notify(SERVER_ERROR_MESSAGE);
		}
	}
}
