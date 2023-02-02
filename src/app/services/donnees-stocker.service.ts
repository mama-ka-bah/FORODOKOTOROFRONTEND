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


  public headerTitle = new BehaviorSubject<any>(null);
  public headerTitle$ = this.headerTitle.asObservable();


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



  public reccupererTitreAccueil(){
    this.headerTitle.next("FORODOKOTORO");
  }
  public reccupererTitreAgriculture(){
    this.headerTitle.next("AGRICULTURE");
  }
  public reccupererTitreMarche(){
    this.headerTitle.next("MARCHE");
  }
  public reccupererTitreTransporteur(){
    this.headerTitle.next("TRANSPORTS");
  }


  
  
 

  constructor() { }


}
