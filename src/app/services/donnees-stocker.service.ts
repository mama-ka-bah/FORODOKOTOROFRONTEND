import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DonneesStockerService {

  enteteAccueil="Forodokotoro";
  enteteMarche="Marché";
  enteteAgriculture="Agriculture";
  enteteTransporteur="Transporteurs"

  pageActuel = "FORODOKOTORO"

  getpageActuel(){
    return this.pageActuel;
  }


  setpageActuel(valeur:string){
     this.pageActuel = valeur;
  }


  constructor() { }
}
