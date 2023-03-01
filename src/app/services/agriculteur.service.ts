import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

 //url de mon controlleur d'authentification
 const AUTH_API = 'http://localhost:8081/transporteurs/';
 const AUTH_API1 = 'http://localhost:8081/agriculteur/';

@Injectable({
  providedIn: 'root'
})
export class AgriculteurService {

  constructor(private http: HttpClient) { }

  devenirTransporteur(file:any, donneesTransporteur:any, id:any): Observable<any> {
    const data:FormData=new FormData();
    data.append("file", file);
    data.append('donneesTransporteur', JSON.stringify(donneesTransporteur).slice(1,JSON.stringify(donneesTransporteur).lastIndexOf(']')));

    // console.log(data)

    return this.http.post( AUTH_API + `devenirtransporteur/${id}`, data);
  }

  contacterTransporteur(transporteur:any, utilisateur:any): Observable<any>{
    return this.http.get( AUTH_API + `contactertransporteur/${transporteur}/${utilisateur}`, {});
  }

  accepterReservation(reservationId:any): Observable<any>{
    return this.http.post( AUTH_API + `acceptereservation/${reservationId}`, {});
  }

  rejeterReservation(reservationId:any): Observable<any>{
    return this.http.post( AUTH_API + `rejetereservation/${reservationId}`, {});
  }
  mettrefinReservation(reservationId:any, transporteurId:any): Observable<any>{
    return this.http.post( AUTH_API + `mettrefinreservation/${reservationId}/${transporteurId}`, {});
  }


  recupererReservationEncours(transId:any): Observable<any>{
    return this.http.get( AUTH_API + `recupererlesreservationencoursduntransporteur/${transId}`);
  }

  
  lesReservationEncours(transporteur:any): Observable<any>{
    return this.http.get( AUTH_API + `reservationenreencoursansporteur/${transporteur}`);
  }

  lesReservationEnAttente(transporteur:any): Observable<any>{
    return this.http.get( AUTH_API + `reservationenattentetransporteur/${transporteur}`);
  }

  lesReservationRejeter(transporteur:any): Observable<any>{
    return this.http.get( AUTH_API + `reservationenrejetertransporteur/${transporteur}`);
  }

  lesReservationAccepter(transporteur:any): Observable<any>{
    return this.http.get( AUTH_API + `reservationacceptetransporteur/${transporteur}`);
  }

  lesReservationTerminer(transporteur:any): Observable<any>{
    return this.http.get( AUTH_API + `reservationenterminertransporteur/${transporteur}`);
  }

  devenirAgriculteur(user:any): Observable<any> {
    const data:FormData=new FormData();

    const userId = [{
      "id":user.id
    }]

    data.append('id', JSON.stringify(userId).slice(1,JSON.stringify(userId).lastIndexOf(']')));


    // console.log(data)

    return this.http.post( AUTH_API1 + 'deveniragriculteur', data);
  }




 
}

  



