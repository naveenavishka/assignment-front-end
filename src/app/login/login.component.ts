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

  username: string;
  password: string;
  message: string | null | undefined;

  constructor(private router: Router, private authService: AuthService, private messagePrivate: MessageService, private route: ActivatedRoute) {
    this.message = this.route.snapshot.queryParamMap.get('message');
  }

  ngOnInit() {

    this.messagePrivate.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' })
  }

  getToek() {
    const result = this.authService.getLoginDetails()
    console.log(result)

    this.authService.getToken()
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

    const result = this.authService.login({ varUserName: this.username, varPassword: this.password })
    // this.messagePrivate.add({ severity: 'error', summary: 'email required', detail: 'Please enter an email address', life: 3000 });
    console.log(result)
    return
  }
  onLogin() {
    const result = this.authService.login({ varUserName: this.username, varPassword: this.password })
    // this.messagePrivate.add({ severity: 'error', summary: 'email required', detail: 'Please enter an email address', life: 3000 });
    console.log(result)
    return
    
    // this.authService.login(this.username, this.password).subscribe(response => {

    //   this.authService.GetLoginDetails().subscribe(data => {

    //     const user = JSON.parse(localStorage.getItem('currentUser'));

    //     user.UserName = data.LoginInfor.UserName;
    //     user.UserCode = data.LoginInfor.UserCode;
    //     user.WHCode = data.LoginInfor.WHCode;
    //     user.CompCode = data.LoginInfor.CompCode;
    //     user.WHName = data.LoginInfor.WHName;
    //     user.CompName = data.LoginInfor.CompName;
    //     user.UserRoleName = data.LoginInfor.UserRoleName;
    //     user.TokenGenDateTime = new Date();

    //     localStorage.setItem('currentUser', JSON.stringify(user));

    //     this.router.navigate(['home/dashboard']);

    //   });

    // }, (error) => {

    //   const errorMessage = error === 'Bad Request' ? 'Username or Password is Incorrect!' : 'Unable to Process the Request';

    //   this.toastr.error(errorMessage, 'Alert - Sign In');

    // });

  }

}
