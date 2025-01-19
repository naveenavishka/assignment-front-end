import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  createCustomer(customer: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const body = JSON.stringify(customer);
    return this.http.post<any>(`${environment.apiUrl}/api/Customers`, body, options).pipe();
  }

  getCustomerList(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/Customers`,).pipe();
  }

  deletCustomer(customer: any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const body = JSON.stringify(customer);
    return this.http.delete<any>(`${environment.apiUrl}/api/Customers/${customer.id}`).pipe();
  }
}
