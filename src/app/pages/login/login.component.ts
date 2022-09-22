import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {User, UserService} from './../../services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loadingData: boolean;
	user: User;
	password: string;
	errorMessage: string;

	constructor(private router: Router, private userService: UserService) {
	}

	ngOnInit() {
		this.user = new User();
	}

	login() {
		this.loadingData = true;
		console.log(this.user);
		this.userService.login(this.user).then((user) => {
			this.loadingData = false;
			console.log(user);
			this.router.navigate(['/dashboard']);
		}).catch((err) => {
			this.errorMessage = err.message;
			this.loadingData = false;
		});
	}

	automaticLogin(loginAs) {
		const user = new User();
		user.password = 'test';
		if (loginAs === 'electionOfficial') {
			user.email = 'admin';
		} else if (loginAs === 'partyHead') {
			user.email = 'partyHead';
		} else if (loginAs === 'candidate') {
			user.email = 'candidate';
		} else if (loginAs === 'voter') {
			user.email = 'voter';
		}
		this.user = user;
		this.login();
	}
}
