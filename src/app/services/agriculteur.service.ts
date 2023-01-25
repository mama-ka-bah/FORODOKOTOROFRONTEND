import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

 //url de mon controlleur d'authentification
 const AUTH_API = 'http://localhost:8081/transporteurs/';

@Injectable({
  providedIn: 'root'
})
export class AgriculteurService {

  constructor(private http: HttpClient) { }

  devenirTransporteur(file:any, donneesTransporteur:any, id:any): Observable<any> {
    const data:FormData=new FormData();
        console.log("mes donnees: " + donneesTransporteur.numeroPlaque)
    console.log("mes donnees: " + donneesTransporteur.disponibilite)
    console.log("mes donnees: " + id)
    console.log("mes donnees: " + file)
    data.append("file", file);
    data.append('donneesTransporteur', JSON.stringify(donneesTransporteur).slice(1,JSON.stringify(donneesTransporteur).lastIndexOf(']')));

    

    console.log(data)

    return this.http.post( AUTH_API + `devenirtransporteur/${id}`, data);
  }

 
}

  



