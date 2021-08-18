import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_VALIDATION_REGEX} from "../config";
import {Location} from "@angular/common";
import {ApiService} from "../services/api.service";
import {DialogService} from "../services/dialog.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	hidePasswordFieldText: boolean = true;

	authForm: FormGroup;

	authForCheckout: boolean = false;

	authFormBusy: boolean = false;

	rememberUser: boolean = false;

	// @ts-ignore
	@ViewChild(MatCheckbox) rememberCheck: MatCheckbox

	constructor(
		private location: Location,
		private apiService: ApiService,
		private dialogService: DialogService,
		private router: Router,
		private userService: UserService
	) {
		this.authForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_VALIDATION_REGEX)]),
			password: new FormControl('', [Validators.required])
		})
	}

	ngOnInit(): void {
		if(this.userService.loggedIn) {
			this.router.navigateByUrl("/");
		}
		else {
			let rememberedUser = localStorage.getItem("rememberedUser");

			if(rememberedUser !== null) {
				this.authForm.controls.email.setValue(rememberedUser);
				this.rememberUser = true;
			}


			let state = this.location.getState();

			// @ts-ignore
			if(state.forCheckout) {
				this.authForCheckout = true;
			}
		}
	}

	login(): void {
		this.authFormBusy = true;
		this.userService.auth(this.authForm.value).subscribe(response => {
			if(response.success) {
				this.userService.login(response.token, response.data.firstname, response.data.lastname, this.authForm.value.email);

				if(this.authForCheckout) {
					this.router.navigateByUrl("/checkout");
				}
				else {
					this.router.navigateByUrl("/products");
				}
			}
			else {
				this.dialogService.notify(response.message)
			}

			if(this.rememberCheck.checked) {
				localStorage.setItem("rememberedUser", this.authForm.value.email);
			}
			else {
				localStorage.removeItem("rememberedUser");
			}

			this.authFormBusy = false;
		}, error => {
			this.apiService.handleHttpErrors(error);
			this.authFormBusy = false;
		})
	}

}
