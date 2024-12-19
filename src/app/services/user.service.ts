import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SBU } from '../models/sbu';
import { Site } from '../models/site';
import { promoteUser } from '../models/promoteUser';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    GetUserList(UserMgFilter:any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
        };
        const body = JSON.stringify(UserMgFilter);
        return this.http.post<any>(`https://alert.hayleysadvantis.com/alert.api/api/V1/User/get-user-list`, body, options).pipe();
    }
    GetUserListByFilter(UserMgFilter:any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
        };
        const body = JSON.stringify(UserMgFilter);
        return this.http.post<any>(`https://alert.hayleysadvantis.com/alert.api/api/V1/User/get-head-user-list`, body, options).pipe();
    }

    PromoteUser(promoteuser:any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
        };
        const body = JSON.stringify(promoteuser);
        return this.http.post<any>(`https://alert.hayleysadvantis.com/alert.api/api/V1/User/promote-user`, body, options).pipe();
    }

    createUser(userDetail:any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            }),
        };
        const body = JSON.stringify(userDetail);
        return this.http.post<any>(`https://alert.hayleysadvantis.com/alert.api/api/V1/User/CreateUser`, body, options).pipe();
    }
}
