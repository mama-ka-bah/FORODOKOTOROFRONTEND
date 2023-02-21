import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { StorageService } from './stockage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: StorageService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/connexion']);
      return false;
    }
    return true;
  }
  
}
