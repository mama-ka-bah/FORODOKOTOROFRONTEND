import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/stockage.service';
import { Router } from '@angular/router';
import * as jwt from 'jsonwebtoken';
// HttpInterceptor a une intercept()méthode pour inspecter et transformer les requêtes
//  HTTP avant qu'elles ne soient envoyées au serveur.

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {


constructor(
  private stockageService: StorageService,
  private routes: Router,
  ){}

userToken:any

intercept(req: HttpRequest<any>, next: HttpHandler) {
  // if(isTokenExpired(this.stockageService.GetJwts().token)){
  //   this.routes.navigateByUrl("/connexion");
  //   return  next.handle(req);
  // }
    if(req.url.includes('signin') || req.url.includes('signup') || req.url.includes('api.openweathermap.org')){
      return next.handle(req);
    }
    else{
      this.userToken = this.stockageService.GetJwts().token;
      // console.log("le token qui sera envoye dans header:  "+ this.userToken);
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.userToken)
      });
      return next.handle(authReq);
    }
  }
}

// function isTokenExpired(token: string): boolean {
//   const decodedToken = jwt.decode(token) as { exp: number };
//   if (!decodedToken.exp) {
//     return true;
//   }
//   const expirationTime = new Date(decodedToken.exp * 1000);
//   const currentTime = new Date();
//   return currentTime.getTime() > expirationTime.getTime();
// }

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];