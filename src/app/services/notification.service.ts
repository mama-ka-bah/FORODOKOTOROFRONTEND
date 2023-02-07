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
  return this.http.get(AUTH_API + `recupererLesNotificationDunUser/${idUser}`);
}

 //permet de recuperer les notifications non lus d'un utilisateur
 recupererNotificationNonLuUser(idUser:any): Observable<any> {
  return this.http.get(AUTH_API + `recupererLesNotificationNonLuDunUser/${idUser}`);
}

//permet de recuperer les notifications non lus d'un utilisateur
recupererNotificationLuUser(idUser:any): Observable<any> {
  return this.http.get(AUTH_API + `recupererLesNotificationLuDunUser/${idUser}`);
}


//permet de mettre à jour le profil de l'utilisateur
marquerLesNotificationDunUserCommeLus(idUser:any, notifications:any): Observable<any> {
  return this.http.patch(AUTH_API + `marquerlesNotificationdunusercommelus/${idUser}`, notifications
  );
}




}
