import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/notifications/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  
  //permet de recuperer le nombre de notification non lu
  recupererNotificationNonLuDunUser(idUser:any): Observable<any> {
    return this.http.get(AUTH_API + `recupererNombreDeNotificationNonLuDunUser/${idUser}`);
}

//permet de recuperer les notifications d'un utilisateur
recupererNotificationUser(idUser:any): Observable<any> {
  return this.http.get(AUTH_API + `recupererNombreDeNotificationNonLuDunUser/${idUser}`);
}

 //permet de recuperer les notifications non lus d'un utilisateur
 recupererNotificationNonLuUser(idUser:any): Observable<any> {
  return this.http.get(AUTH_API + `recupererNombreDeNotificationNonLuDunUser/${idUser}`);
}

 //permet de recuperer les notifications lus d'un utilisateur
 recupererNotificationLuDunUser(idUser:any): Observable<any> {
  return this.http.get(AUTH_API + `recupererNombreDeNotificationNonLuDunUser/${idUser}`);
}



}
