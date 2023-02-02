import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'jwt';
const CHAMP_KEY = 'champ';
const STOCKS_KEY = 'stocks';
const PARSERELLE_KEY = 'parserelle';
const CULTIVE_KEY = 'cultive';
const PRODUITAGRICOLE_KEY = 'produitagricole';
const CURRENTURL_KEY = "currenturl";
const PHASESCULTIVE_KEY = "phasescultive";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  //permet de supprimer les données contenant sessionStorage
  clean(): void {
    window.sessionStorage.clear();
  }

  //permet d'enregistrer l'user dans sessionStorrage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));


    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(user.token));
  }

  //permeet de recuperer user dans sessionStorrage
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  //verifie si l'utilisateur est connecter ou non
  public isLoggedIn(): boolean {
    //recuperer utilisateur dans session storage
    const user = window.sessionStorage.getItem(USER_KEY);
    //si utilisateur existe on retourne true
    if (user) {
      return true;
    }
    //sinon on retourne false
    return false;
  }



//enregistrement des champ

  //permet d'enregistrer un champ dans sessionStorrage
  public saveChamps(meschamps: any): void {
    window.sessionStorage.removeItem(CHAMP_KEY);
    window.sessionStorage.setItem(CHAMP_KEY, JSON.stringify(meschamps));
  }

  //permeet de recuperer un champ dans sessionStorrage
  public getChamps(): any {
    const meschamp = window.sessionStorage.getItem(CHAMP_KEY);
    if (meschamp) {
      return JSON.parse(meschamp);
    }

    return {};
  }












  //enregistrement des stocks

  //permet d'enregistrer un stocks dans sessionStorrage
  public saveStocks(messtocks: any): void {
    window.sessionStorage.removeItem(STOCKS_KEY);
    window.sessionStorage.setItem(STOCKS_KEY, JSON.stringify(messtocks));
  }

  //permeet de recuperer un stocks dans sessionStorrage
  public getStocks(): any {
    const messtocks = window.sessionStorage.getItem(STOCKS_KEY);
    if (messtocks) {
      return JSON.parse(messtocks);
    }

    return {};
  }








  //enregistrement des parserelles de l'utilisateur

  //permet d'enregistrer les parserelles dans sessionStorrage
  public saveParserelle(parserellesDeMonChamp: any): void {
    window.sessionStorage.removeItem(PARSERELLE_KEY);
    window.sessionStorage.setItem(PARSERELLE_KEY, JSON.stringify(parserellesDeMonChamp));
  }

  //permeet de recuperer un champ dans sessionStorrage
  public getParserelle(): any {
    const parserellesDeMonChamp = window.sessionStorage.getItem(PARSERELLE_KEY);
    if (parserellesDeMonChamp) {
      return JSON.parse(parserellesDeMonChamp);
    }

    return {};
  }








   //enregistrement des cultives liées à une parserelle

  //permet d'enregistrer les cultives dans sessionStorrage
  public saveCultive(cultiveDeMonParserelle: any): void {
    window.sessionStorage.removeItem(CULTIVE_KEY);
    window.sessionStorage.setItem(CULTIVE_KEY, JSON.stringify(cultiveDeMonParserelle));
  }
  
  //permeet de recuperer les cultives de la parserelle enregistrés dans sessionStorrage
  public getCultive(): any {
    const cultiveDeMonParserelle = window.sessionStorage.getItem(CULTIVE_KEY);
    if (cultiveDeMonParserelle) {
      return JSON.parse(cultiveDeMonParserelle);
    }
    return {};
  }


  
   //enregistrement des  produits agricoles
  //permet d'enregistrer les cultives dans sessionStorrage
  public saveProduitAgricole(produitsAgricolesAStocker: any): void {
    window.sessionStorage.removeItem(PRODUITAGRICOLE_KEY);
    window.sessionStorage.setItem(PRODUITAGRICOLE_KEY, JSON.stringify(produitsAgricolesAStocker));
  }
  
  //permeet de recuperer les cultives de la parserelle enregistrés dans sessionStorrage
  public getProduitAgricole(): any {
    const produitsAgricolesAStocker = window.sessionStorage.getItem(PRODUITAGRICOLE_KEY);
    if (produitsAgricolesAStocker) {
      return JSON.parse(produitsAgricolesAStocker);
    }
    return {};
  }



  
   //enregistrement de l'url actuel dans session
  //permet d'enregistrer l'url actuel dans sessionStorrage
  public saveCurrentUrl(urlAStocker: any): void {
    window.sessionStorage.removeItem(CURRENTURL_KEY);
    window.sessionStorage.setItem(CURRENTURL_KEY, JSON.stringify(urlAStocker));
  }
  
  //permeet de recuperer l'url enregistré dans sessionStorrage
  public getCurrentUrl(): any {
    const urlStocker = window.sessionStorage.getItem(CURRENTURL_KEY);
    if (urlStocker) {
      return JSON.parse(urlStocker);
    }
    return {};
  }



  //enregistrement des phases d'un cultive dans la session
  //permet d'enregistrer les phases du cultive active dans sessionStorrage
  public savePhases(phasesAStocker: any): void {
    window.sessionStorage.removeItem(PHASESCULTIVE_KEY);
    window.sessionStorage.setItem(PHASESCULTIVE_KEY, JSON.stringify(phasesAStocker));
  }
  
  //permeet de recuperer les phases du cultive active dans la sessionStorrage
  public getPhases(): any {
    const phasesARecuperer = window.sessionStorage.getItem(PHASESCULTIVE_KEY);
    if (phasesARecuperer) {
      return JSON.parse(phasesARecuperer);
    }
    return {};
  }


}