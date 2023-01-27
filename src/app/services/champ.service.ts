import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/champs/';


//l'entete du navigateur
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  constructor(private http: HttpClient) { }


  recupererChampParProprietaire(id:any): Observable<any> {

    return this.http.get(AUTH_API + `leschampagriculteur/${id}`, { withCredentials: true });
  }

  recupererChampParId(id:any): Observable<any> {

    return this.http.get(AUTH_API + `detailChamp/${id}`, { withCredentials: true });
  }

}
