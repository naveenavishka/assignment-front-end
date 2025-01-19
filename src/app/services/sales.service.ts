import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalesModel } from '../models/sales1.model';

@Injectable()
export class SalesService {

  constructor(private http: HttpClient) { }

  createSale(sale:SalesModel): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const body = JSON.stringify(sale);
    return this.http.post<any>(`${environment.apiUrl}/api/Sales`, body, options).pipe();
  }
  createSaleDetails(sale:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const body = JSON.stringify(sale);
    return this.http.post<any>(`${environment.apiUrl}/api/SaleDetails`, body, options).pipe();
  }
}
