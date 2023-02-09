import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//url de mon controlleur d'authentification
const AUTH_API = 'http://localhost:8081/api/auth/';
const AUTH_API1 = 'http://localhost:8081/transporteurs/';

//l'entete du navigateur
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) {}

  // fonction permettant de gerer la connexion
  login(username: string, password: string): Observable<any> {
    console.table("username: " + username);
    console.table("mot de passe" + password);
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

    // fonction permettant de gerer l'inscription
  
    register(donneesuser:any): Observable<any> {
    const data:FormData=new FormData();

    data.append('donneesuser', JSON.stringify(donneesuser).slice(1,JSON.stringify(donneesuser).lastIndexOf(']')));

    console.log(data);
    
    return this.http.post(
      AUTH_API + 'signup',
      data
    );
  }

    // fonction permettant de gerer la deconnexion
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }


  motdepasseoublier(email:any): Observable<any> {    

    return this.http.post(
      AUTH_API + "motdepasseoublier",
      email
    );
  }

   //permet de mettre à jour le profil de l'utilisateur
   modifierProfilUtilisateur(idUser:any, user:any): Observable<any> {
    return this.http.patch(AUTH_API + `modifierutilisateur/${idUser}`, user
    );
  }

   //permet de mettre à jour le profil de l'utilisateur
   modifierPhotoProfil(idUser:any, data:any): Observable<any> {
    return this.http.patch(AUTH_API + `modifierprofil/${idUser}`, data
    );
  }

  //permet de mettre à jour le profil de l'utilisateur
  recupererTousLesTransporteur(): Observable<any> {
    return this.http.get(AUTH_API1 + 'RecupererTousTransporteur'
    );
  }


  modifierMotDePasse(iduser:any, password:any): Observable<any> {    

    return this.http.patch(
      AUTH_API + `modifierutilisateur/${iduser}`,
      password
    );
  }


}
