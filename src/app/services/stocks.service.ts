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

  recupererTousLesStocks(): Observable<any> {

    return this.http.get(AUTH_API + `stocksactives`);
  }

  recupererStockParId(id:any): Observable<any> {

    return this.http.get(AUTH_API + `detailstock/${id}`);
  }

  //permet de recuper les évolution d'un
  recupererTousevolutionStocksDunStocks(idStock:any): Observable<any> {
    return this.http.get(AUTH_API + `recuperertousevolutionstocksdunstocks/${idStock}`);
  }


  //permet d'ajouter un stock
  ajouterStock(varieteid:any, idProprietaire:any, stock:any): Observable<any> {
    return this.http.post(AUTH_API + `ajouter/${varieteid}/${idProprietaire}`, stock);
  }

   //permet de mettre à jour un stock
   mettreAjourStock(stockid:any, quantiteRestant:any, evolutionstock:any): Observable<any> {
    return this.http.post(AUTH_API + `mettrejourstock/${stockid}/${quantiteRestant}`, evolutionstock);
  }


}
