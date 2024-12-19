import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SBU } from '../models/sbu';
import { Site } from '../models/site';
import { userCatFIlter } from '../models/userCatFIlter';
import { UserPromote } from '../models/UserPromote';

@Injectable()
export class MasterService {

    constructor(private http: HttpClient) { }

    GetClusterListByUser(varUserCode: string): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>(`${environment.apiUrl}/api/V1/Master/GetClusterListByUser?varUserCode=${varUserCode}`, options).pipe();
    }

    GetSBUListByUser(varUserCode: string, varClusterCode: string): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        // tslint:disable-next-line: max-line-length
        return this.http.get<any>(`${environment.apiUrl}/api/V1/Master/GetSBUListByUser?varUserCode=${varUserCode}&varClusterCode=${varClusterCode}`, options).pipe();
    }

    GetSiteListByUser(varUserCode: string, varSBUCode: string): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>
            (`${environment.apiUrl}/api/V1/Master/GetSiteListByUser?varUserCode=${varUserCode}&varSBUCode=${varSBUCode}`, options).pipe();
    }

    GetAllHeadUsers(): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>
            (`${environment.apiUrl}/api/V1/UserDt/GetHeadUsers`, options).pipe();
    }



    addEditSBU(singleSBU: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Master/AddEditSBU`,JSON.stringify(singleSBU), options).pipe();
    }
    DeleteSBU(userpromote: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Master/DeleteSBU`,JSON.stringify(userpromote), options).pipe();
    }
    DeleteSite(userpromote: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Master/DeleteSite`,JSON.stringify(userpromote), options).pipe();
    }













    UpdateEmailList(singleSBU: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Master/UpdateEmailList`,JSON.stringify(singleSBU), options).pipe();
    }
    UpdateSiteEmailList(singleSBU: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Master/UpdateSiteEmailList`,JSON.stringify(singleSBU), options).pipe();
    }
    

    GetUserListByCategory(userCatFilter: userCatFIlter): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/User/GetUserListByCategory`,JSON.stringify(userCatFilter), options).pipe();
    }









    PromoteUser(userpromote: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/User/AssignUserRole`,JSON.stringify(userpromote), options).pipe();
    }
    DemoteUser(userpromote: any): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),

        };

        // tslint:disable-next-line: max-line-length
        return this.http.post<any>(`${environment.apiUrl}/api/V1/User/DemoteUser`,JSON.stringify(userpromote), options).pipe();
    }
    
}
