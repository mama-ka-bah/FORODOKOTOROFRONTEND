import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/publications/';


@Injectable({
  providedIn: 'root'
})
export class CommunauteService {

  constructor(private http: HttpClient) { }

  //permet d'ajouter une publication
  ajouterPublication(pubReçu:any, idUser:any): Observable<any> {
    
    return this.http.post(
      AUTH_API + `ajouter/${idUser}`,
      pubReçu
    );
  }

  
  //permet d'ajouter une publication
 modifierPublication(publication:any, idUser:any): Observable<any> {
    return this.http.patch(
      AUTH_API + `modifierpublication/${idUser}`,
      publication
    );
  }


  //recuperere Toutes Les Publications Ordonnees Par Date Pub
  recupererToutesLesPublicationsOrdonneesParDatePub(): Observable<any> {
    return this.http.get(AUTH_API + 'recuperertouspublications');
  }

   //recuperere les details d'une publication
   recupererDetailDunePublication(idpub:any): Observable<any> {
    return this.http.get(AUTH_API + `recupererpublicationparid/${idpub}`);
  }

   //recuperere les commentaires d'une publication ordonnee par date de publication
   recupererCommentairesDunepublication(idpub:any): Observable<any> {
    return this.http.get(AUTH_API + `recuperertouscommentairedunepublication/${idpub}`);
  }



  //permet d'ajouter un commentaire à une publication
  ajouterCommentaire(idUser:any, idPub:any, commentaire:any): Observable<any> {
    return this.http.post(
      AUTH_API + `ajoutercomentaire/${idUser}/${idPub}`,
      commentaire
    );
  }

  
  //permet d'ajouter un commentaire à une publication
  modifierCommentaire(idCommentaire:any, commentaire:any): Observable<any> {
    return this.http.patch(
      AUTH_API + `modifiercommentaire/${idCommentaire}`,
      commentaire
    );
  }


  //permet d'aimer une publication
  aimerUnePublication(idpub:any, iduser: any, aimes:any): Observable<any> {
    return this.http.post(AUTH_API + `aimerunpublication/${idpub}/${iduser}`, aimes);
  }


}
