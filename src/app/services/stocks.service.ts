import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/stocks/';


//l'entete du navigateur
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }


  recupererStocksParProprietaire(id:any): Observable<any> {

    return this.http.get(AUTH_API + `recuperertousstocksvalidesagriculteur/${id}`);
  }
}