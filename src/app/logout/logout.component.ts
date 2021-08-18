import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {DialogService} from "../services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(
		private userService: UserService,
		private dialogService: DialogService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.userService.logout();
		this.dialogService.notify("You have successfully logged out", "success");
		this.router.navigateByUrl("/login");
	}

}
