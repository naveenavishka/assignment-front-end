import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LUser } from "../models/LUser"
import { MessageService } from "primeng/api";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = `${environment.apiUrl}/api/V1/User/Login`
    private user: LUser
    


    constructor(private http: HttpClient, private router: Router, private _messageService:MessageService) {
        this.user = new LUser()
    }

    login(credentials: { varUserName: string, varPassword: string }) {
        const data = JSON.stringify(credentials)

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        this.http.post<any>(this.loginUrl, data, options).subscribe({
            next: (loginresponse: any) => {
                if (loginresponse.message === "success") {
                    this.user.userToken = loginresponse.UserToken
                    this.user.authority = loginresponse.authority
                    if (!( loginresponse.authority === "Admin" || loginresponse.authority === "header")){
                        this._messageService.add({ severity: 'error', summary: 'Access denied!', detail: 'Please use the mobile app!', life: 3000 });
                        return
                    }
                    localStorage.setItem("token", loginresponse.UserToken)
                     this.getLoginDetails()
                    this._messageService.add({ severity: 'success', summary: 'loggedin', detail: 'You will be redirected to the dashbard', life: 3000 });

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

    getLoginDetails() {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',

            }),
        };

        this.http.get<any>(`${environment.apiUrl}/api/V1/User/GetLoginInfo`,).subscribe({
            next: (loginDetails: any) => {
                const { varDfltGroupCode, varDfltSBUCode, varDfltSiteCode, varEmail, varPassword, varUserCode, varUserName } = loginDetails.LoginInfor
                this.user.varDfltGroupCode = varDfltGroupCode
                this.user.varDfltSBUCode = varDfltSBUCode
                this.user.varDfltSiteCode = varDfltSiteCode
                this.user.varEmail = varEmail
                this.user.varPassword = varPassword
                this.user.varUserCode = varUserCode
                this.user.varUserName = varUserName
                localStorage.setItem("currentUser", JSON.stringify(this.user))
                this.router.navigate(["/home/hoc-dashboard"])
                return "success"
            },
            error: (error: any) => {
                return "error"

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