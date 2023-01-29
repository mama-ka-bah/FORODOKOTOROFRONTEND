import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/champs/';
const AUTH_API1 = 'http://localhost:8081/parserelle/';
const AUTH_API2 = 'http://localhost:8081/cultive/';


//l'entete du navigateur
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  constructor(private http: HttpClient) { }

//permet de recuperer tous les champ appartenant à un agriculteur
  recupererChampParProprietaire(id:any): Observable<any> {

    return this.http.get(AUTH_API + `leschampagriculteur/${id}`, { withCredentials: true });
  }

  //permet de recuperer un champ par son id
  recupererChampParId(id:any): Observable<any> {

    return this.http.get(AUTH_API + `detailChamp/${id}`, { withCredentials: true });
  }


  //permet d'ajouter un champ
  ajouterChamp(data:any, idProprietaire:number): Observable<any> {
    console.log(data)
    return this.http.post(AUTH_API + `ajouter/${idProprietaire}`, data);
  }

  //permet d'ajouter une parserelle à un champ
  ajouterParserelle(data:any, idChamp:any): Observable<any> {

    const id = 1;
    
    console.log("id du champ: " + idChamp)
    return this.http.post(AUTH_API1 + `ajouterparserelle/${idChamp}`, data);
  }

  //permet de recuperer les Parsererelles Dun Champ
  recupererParsererelleDunChamp(idChamp:any): Observable<any> {
    
    console.log("id du champ: " + idChamp)
    return this.http.get(AUTH_API1 + `recupererlesparserelledunchamp/${idChamp}`);
  }
 


  //permet de  recuperer Les Cultive active Dune Parsererelle ordonne par date de fin
  recupererLesCultiveDuneParsererelle(idparserelle:any): Observable<any> {
    
    console.log("id du champ: " + idparserelle)
    return this.http.get(AUTH_API2 + `recupererlescultivesactiveduneparserelleordonnepardatedefin/${idparserelle}`);
  }

}
