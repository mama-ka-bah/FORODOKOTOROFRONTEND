import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/stockage.service';

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


constructor(private stockageService: StorageService){}

userToken:any

intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.includes('signin') || req.url.includes('signup') || req.url.includes('api.openweathermap.org')){
      return next.handle(req);
    }else{
      // this.userToken = this.stockageService.getUser().token;
      // const authToken = sessionStorage.getItem('jwt');
      this.userToken = this.stockageService.GetJwts().token;
      console.log("le token qui sera envoye dans header:  "+ this.userToken);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.userToken)
      });
      return next.handle(authReq);
    }
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];