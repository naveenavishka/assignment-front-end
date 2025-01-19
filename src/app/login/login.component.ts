import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, MessagesModule]
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  message: string | null | undefined;

  constructor(private router: Router, private authService: AuthService, private messagePrivate: MessageService, private route: ActivatedRoute) {
    this.message = this.route.snapshot.queryParamMap.get('message');
  }

  ngOnInit() {

  }

  LoginAction(loginForm: NgForm) {
    if (loginForm.invalid) {
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.controls[field];
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      });
      return
    }

    const result = this.authService.login({ username: this.username, password: this.password })
    console.log(result)
    return
  }
  onLogin() {
    const result = this.authService.login({ username: this.username, password: this.password })
    console.log(result)
    return

  }

}
