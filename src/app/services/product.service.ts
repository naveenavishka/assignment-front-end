import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(product: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    const body = JSON.stringify(product);
    return this.http.post<any>(`${environment.apiUrl}/api/Products`, body, options).pipe();
  }

  uploadproductImage(profuctimagefor: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(`${environment.apiUrl}/api/Products/Upload`, profuctimagefor).pipe();
  }

  getProductList(): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/api/Products`,).pipe();
  }
  deleteProduct(productID:number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/api/Products/${productID}`,).pipe();
  }
}
