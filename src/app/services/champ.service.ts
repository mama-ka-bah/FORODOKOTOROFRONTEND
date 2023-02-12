import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/champs/';
const AUTH_API1 = 'http://localhost:8081/parserelle/';
const AUTH_API2 = 'http://localhost:8081/cultive/';
const AUTH_API3 = 'http://localhost:8081/previsions/';
const AUTH_API4 = 'http://localhost:8081/phases/';


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
    return this.http.get(AUTH_API + `detailChamp/${id}`);
  }


  //permet d'ajouter un champ
  ajouterChamp(data:any, idProprietaire:number): Observable<any> {
    return this.http.post(AUTH_API + `ajouter/${idProprietaire}`, data);
  }

  //permet d'ajouter une parserelle à un champ
  ajouterParserelle(data:any, idChamp:any): Observable<any> {
    return this.http.post(AUTH_API1 + `ajouterparserelle/${idChamp}`, data);
  }

  //permet de recuperer les Parsererelles Dun Champ
  recupererParsererelleDunChamp(idChamp:any): Observable<any> {
        return this.http.get(AUTH_API1 + `recupererlesparserelledunchamp/${idChamp}`);
  }

  //permet de recuperer cultive par son id
  recupererCultiveParSonId(idCulltive:any): Observable<any> {
    return this.http.get(AUTH_API2 + `detailCultive/${idCulltive}`);
}
 
//permet de modifier un cultive
modifierUnCultive(idCultive:any, cultive:any){
  return this.http.patch(AUTH_API2 + `modifier/${idCultive}`, cultive);
}

//permet de modifier un cultive
signalercultivecommenonterminer(idCultive:any){
  return this.http.delete(AUTH_API2 + `signalercultivecommenonterminer/${idCultive}`);
}



  //permet de  recuperer Les Cultive active Dune Parsererelle ordonne par date de fin
  recupererLesCultiveDuneParsererelle(idparserelle:any): Observable<any> {
        return this.http.get(AUTH_API2 + `recupererlescultivesactiveduneparserelleordonnepardatedefin/${idparserelle}`);
  }

    //permet de recuperer les previsions d'un cultive donnée
    recupererPrevisionDunCultive(idCulltive:any): Observable<any> {
      return this.http.get(AUTH_API3 + `recupererlesprevisionsduncultive/${idCulltive}`);
    }


     //permet d'ajouter une phase à un cultive
     AjouterPhaseACultive(data:any, idCultive:any): Observable<any> {
      return this.http.post(AUTH_API4 + `ajouter/${idCultive}`, data);
    }

     //permet de recuperer Phase Actives Dune cultive
     recupererPhaseActivesDunecultive(idCultive:any): Observable<any> {
      return this.http.get(AUTH_API4 + `recupererphaseactivesdunecultive/${idCultive}`);
    }


     //permet de mettre à jour la quantité du recolte réelle realisé par l'agriculteur
     mettreAjourQuantiteReelleDeRecolte(idCultive:any, quantite:any): Observable<any> {
      return this.http.patch(AUTH_API2 + `modifier/${idCultive}`,
        {
          "recolterealise":quantite
        }
      );
    }


    mettrefinAunCultive(idCultive:any, dateFinCultive:any, quantiteRecolte:any){

      const data:FormData=new FormData();

        data.append('datefin', JSON.stringify(dateFinCultive).slice(1,JSON.stringify(dateFinCultive).lastIndexOf(']')));

      return this.http.patch(AUTH_API2 + `mettrefinauncultive/${idCultive}/${quantiteRecolte}`, data);
    }

    recupererParserelleParId(idParserelle:any){
      return this.http.get(AUTH_API1 + `recupererparserelleparsonid/${idParserelle}`);
    }


}
