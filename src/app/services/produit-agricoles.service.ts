import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './stockage.service';

const AUTH_API = 'http://localhost:8081/produitagricoles/';
const AUTH_API1 = 'http://localhost:8081/varietes/';
const AUTH_API2 = 'http://localhost:8081/cultive/';

@Injectable({
  providedIn: 'root'
})
export class ProduitAgricolesService {

lesProduitAgricoleRecuperer:any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) { }


   //permet de recuperer les produit agricoles depuis la base des données, le nom doit etre corrigé
   recupererParsererelleDunChamp(): Observable<any> {
    this.lesProduitAgricoleRecuperer =  this.http.get(AUTH_API + "produitagricoleactives");
    return this.lesProduitAgricoleRecuperer;
  }

  //permet de recuperer les varietes d'un produit agricoles
  recupererLesVarietesDunProduitAgricole(idProduitAgricole:any): Observable<any> {
    return this.http.get(AUTH_API1 + `recuperervarietesparproduit/${idProduitAgricole}`);
  }

  //permet de recuperer les details d'un produit agricoles
  recupererLesDetailsProduitAgricole(idProduitAgricole:any): Observable<any> {
    return this.http.get(AUTH_API1 + `detailproduitagricole/${idProduitAgricole}`);
  }

  //permet d'ajouter un cultive
  ajouterCultive(cultive:any, varieteid:any, parserelleid:any): Observable<any> {
    return this.http.post(AUTH_API2 + `ajouter/${varieteid}/${parserelleid}`, cultive);
  }

}
