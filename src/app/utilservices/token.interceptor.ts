import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs"
import { AuthService } from "../services/auth.service"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"

@Injectable()
export class ToeknInterceptor implements HttpInterceptor{
    constructor(private authservice:AuthService, private router: Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authservice.getToken()
        if(token){
            req = req.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            })
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                // If the server returns a 401, redirect to the login page
                this.router.navigate(['/login'],{
                    queryParams: { message: 'unauthorized-request' }
                  });
              }
      
              // Pass the error to the caller
              return throwError(() => error);
            })
          );
    }
}