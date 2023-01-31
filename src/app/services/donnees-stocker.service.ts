import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonneesStockerService {

  public enteteAccueil="Forodokotoro";
  public enteteMarche="Marché";
  public enteteAgriculture="Agriculture";
  public enteteTransporteur="Transporteurs"

  public showMenu = new BehaviorSubject<boolean>(false);

  public showMenu$ = this.showMenu.asObservable();

  pageActuel = "FORODOKOTORO"

  currentUrl= "";
 

  getpageActuel(){
    return this.pageActuel;
  }

  setpageActuel(valeur:string){
     this.pageActuel = valeur;
  }

  getCurrentUrl(){
    return this.currentUrl;
  }


  setCurrentUrl(valeur:string){
     this.currentUrl = valeur;
  }
 

  constructor() { }


}
