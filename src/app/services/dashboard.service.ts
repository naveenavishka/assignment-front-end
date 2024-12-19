import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IncidentCloseDT } from '../models/incident-close-dt';
import { FilterConfig } from '../models/filter-config';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) { }

    GetIncDetails(IncHed: FilterConfig): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        const body = JSON.stringify({
            varUserCode: IncHed.varUserCode,
            dteFromDate: IncHed.dteFromDate,
            dteToDate: IncHed.dteToDate,
            varSearchStr: IncHed.varSearchStr,
            //varEvent: "FilterByStr",
            varEvent: IncHed.varEvent,
            numPageValue: IncHed.numPageValue,
            varSearchRisk: "All",
            numCatgoryID: IncHed.numCatgoryID
          })
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Incident/GetIncidentSummary/`, body, options).pipe();
    }
    GetRowCount(IncHed: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        const body = JSON.stringify(IncHed);
        var result = this.http.post<any>(`${environment.apiUrl}/api/V1/Incident/GetRowCount/`, body, options).pipe();
        return result
    }

    GetIncImages(numIncID: number): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>(`${environment.apiUrl}/api/V1/Incident/GetIncImages/` + numIncID, options).pipe();
    }

    GetSafetyWalkImages(numWalkID: number): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>(`${environment.apiUrl}/api/V1/Safetywalk/GetIncImages/` + numWalkID, options).pipe();
    }

    GetSafetyWalkDetails(WalkHed: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        const body = JSON.stringify(WalkHed);

        return this.http.post<any>(`${environment.apiUrl}/api/V1/Safetywalk/GetWalkDetails/`, body, options).pipe();
    }

    GetSuggestionDetails(filterConfig: any): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        const body = JSON.stringify(filterConfig);
        //return this.http.post<any>(`${environment.apiUrl}/api/V1/Suggestion/GetSuggestionDetails/`, body, options).pipe();
        return this.http.post<any>(`${environment.apiUrl}/api/V1/Suggestion/GetSuggestionSummary`, body, options).pipe();
    }

    GetSuggestionImages(numSuggestionID: number): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>(`${environment.apiUrl}/api/V1/Suggestion/GetSuggestionImages/` + numSuggestionID, options).pipe();
    }

    GetSuggestionActImages(numActionID: number): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.get<any>(`${environment.apiUrl}/api/V1/Suggestion/GetSuggestionActImages/` + numActionID, options).pipe();
    }

    AssignHeadUsersToIncident(incidentId: number, UserCode: string): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        return this.http.put<any>(`${environment.apiUrl}/api/V1/Incident/assignHeadUser/` + incidentId + `/` + UserCode, options).pipe();
    }

    CloseIncident(incidentCloseDT: IncidentCloseDT): Observable<any> {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        const body = JSON.stringify(incidentCloseDT);

        return this.http.post<any>(`${environment.apiUrl}/api/V1/Incident/closeIncident`, body, options).pipe();
    }

}
