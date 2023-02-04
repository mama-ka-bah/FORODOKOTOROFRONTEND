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

//utiliser pour mettre à jour les données de l'entete en fonction des pages
  public headerTitle = new BehaviorSubject<any>(null);
  public headerTitle$ = this.headerTitle.asObservable();

  //Les données de champ de l'user Actuel en fonction des differentes redirections
  public lesChampsDeLuserActuel = new BehaviorSubject<any>(null);
  public lesChampsDeLuserActuel$ = this.lesChampsDeLuserActuel.asObservable();

  //index champ actuel
  public indexChampActuel = new BehaviorSubject<any>(null);
  public indexChampActuel$ = this.indexChampActuel.asObservable();

  
  //detail de cultive actuel
  public detailCultive = new BehaviorSubject<any>(null);
  public detailCultive$ = this.detailCultive.asObservable();



  pageActuel = "FORODOKOTORO";

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
