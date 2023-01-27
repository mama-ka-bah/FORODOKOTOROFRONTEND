import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

// HttpInterceptor a une intercept()méthode pour inspecter et transformer les requêtes
//  HTTP avant qu'elles ne soient envoyées au serveur.

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       withCredentials: true,
//     });

//     return next.handle(req);
//   }

intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.includes('signin') || req.url.includes('signin') || req.url.includes('api.openweathermap.org')){
      return next.handle(req);
    }else{
      const authToken = sessionStorage.getItem('jwt');
      console.log("tttttttttttttttttttttttttttttttttttttttttt:  "+authToken);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authReq);
    }
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];