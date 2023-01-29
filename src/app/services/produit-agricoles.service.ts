import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './stockage.service';

const AUTH_API = 'http://localhost:8081/produitagricoles/';
const AUTH_API1 = 'http://localhost:8081/varietes/';

@Injectable({
  providedIn: 'root'
})
export class ProduitAgricolesService {

lesProduitAgricoleRecuperer:any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) { }


   //permet de recuperer les produit agricoles depuis la base des données
   recupererParsererelleDunChamp(): Observable<any> {
    this.lesProduitAgricoleRecuperer =  this.http.get(AUTH_API + "produitagricoleactives");
    return this.lesProduitAgricoleRecuperer;
  }

  //permet de recuperer les varietes d'un produit agricoles
  recupererLesVarietesDunProduitAgricole(idProduitAgricole:any): Observable<any> {
    return this.http.get(AUTH_API1 + `recuperervarietesparproduit/${idProduitAgricole}`);
  }

}
