import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../validators/custom-validators";
import {ApiService} from "../services/api.service";
import {UserService} from "../services/user.service";
import {DialogService} from "../services/dialog.service";
import {Router} from "@angular/router";
import {EMAIL_VALIDATION_REGEX} from "../config";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	registerFormBusy: boolean = false;

	constructor(
		private apiService: ApiService,
		private userService: UserService,
		private dialogService: DialogService,
		private router: Router
	) {
		this.registerForm = new FormGroup({
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_VALIDATION_REGEX)]),
			password: new FormControl('', [Validators.required]),
			confirmPassword: new FormControl('', [Validators.required])
			//@ts-ignore
		}, CustomValidators.matchPassword);
	}

	ngOnInit(): void {
	}

	register(): void {
		this.registerFormBusy = true;
		this.userService.register(this.registerForm.value).subscribe(response => {
			if(response.success) {
				this.router.navigateByUrl("/register/done");
			}
			else {
				this.dialogService.notify(response.message);
				this.registerFormBusy = false;
			}
		}, error => {
			this.apiService.handleHttpErrors(error);
			this.registerFormBusy = false;
		})
	}
}
