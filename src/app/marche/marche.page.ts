import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.page.html',
  styleUrls: ['./marche.page.scss'],
})
export class MarchePage implements OnInit {

  constructor(
    private donneesService: DonneesStockerService,
    private storageService : StorageService,
    private router : Router,
    ) {
      const currentUrl = this.router.url;
      const pageName = currentUrl.split('/')[1];
      storageService.saveCurrentUrl(currentUrl);
     }

     ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
    }

  ngOnInit() {
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Marché");
  }

}
