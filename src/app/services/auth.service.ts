import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

import { MessageService } from "primeng/api";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = `${environment.apiUrl}/api/Users/login`



    constructor(private http: HttpClient, private router: Router, private _messageService:MessageService,) {

    }

    login(credentials: { username: string, password: string }) {
        const data = JSON.stringify(credentials)

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        this.http.post<any>(this.loginUrl, data, options).subscribe({
            next: (loginresponse: any) => {
                if (loginresponse.message === "success") {
                    console.log(loginresponse.token, loginresponse)
                    localStorage.setItem("token", loginresponse.token)
                     
                    this._messageService.add({ severity: 'success', summary: 'loggedin', detail: 'You will be redirected to the dashbard', life: 3000 });
                    this.router.navigate(["/home/product/list"])
                } else {
                    this._messageService.add({ severity: 'error', summary: 'Failed', detail: 'User name or password is incorrect!', life: 3000 });
                }

            },
            error: (error) => {
                this._messageService.add({ severity: 'error', summary: 'bad request', detail: 'Please try again later!', life: 3000 });

                console.log(error)
            }
        })
    }

   
    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

    getToken() {
        return localStorage.getItem("token")
    }
}