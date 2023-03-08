import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-produit-agricoles',
  templateUrl: './produit-agricoles.page.html',
  styleUrls: ['./produit-agricoles.page.scss'],
})
export class ProduitAgricolesPage implements OnInit {

  currentUrl:any;
  produitsAgricolesRecuperer:any;

   //pour la pagination et la recherche
   p: number = 1;
   searchTerm:any;  
   filterTerm:any;

  constructor(
    private donneesService: DonneesStockerService,
    private storageService : StorageService,
    private router : Router,
    private produitAgricolesService:ProduitAgricolesService
    ) { }

    ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
    }

  ngOnInit() {
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Agricultures");
    this.currentUrl = this.router.url;
    this.storageService.saveCurrentUrl(this.currentUrl);
    this.recupererTousLesProduitsAgricoles();
  }


  recupererTousLesProduitsAgricoles(){
    this.produitAgricolesService.recupererParsererelleDunChamp().subscribe(data =>{
      this.produitsAgricolesRecuperer = data;
    })
  }

}
