import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

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
}