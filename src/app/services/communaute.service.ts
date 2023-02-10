import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/publications/';


@Injectable({
  providedIn: 'root'
})
export class CommunauteService {

  constructor(private http: HttpClient) { }

  ajouterPublication(pubReçu:any, idUser:any): Observable<any> {
    
    return this.http.post(
      AUTH_API + `ajouter/${idUser}`,
      pubReçu
    );
  }

  recupererToutesLesPublicationsOrdonneesParDatePub(): Observable<any> {
    return this.http.get(AUTH_API + 'recuperertouspublications');
  }
}
