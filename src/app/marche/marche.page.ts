import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';


@Component({
  selector: 'app-marche',
  templateUrl: './marche.page.html',
  styleUrls: ['./marche.page.scss'],
})
export class MarchePage implements OnInit {

  lesStocks:any;
  lesGraines:any;
  lesSemences:any;

  //pour la pagination et la recherche
  p: number = 1;
  searchTerm:any;  
  filterTerm:any;


  //les boolean d'activations des type de stocks
  tout:boolean = false;
  semence:boolean = false;
  graine:boolean = false;

  constructor(
    private donneesService: DonneesStockerService,
    private storageService : StorageService,
    private router : Router,
    private stockService: StocksService
    ) {
      const currentUrl = this.router.url;
      const pageName = currentUrl.split('/')[1];
      storageService.saveCurrentUrl(currentUrl);
     }


     ionViewWillEnter(){
      this.donneesService.showMenu.next(true);
      this.recupererLesStockDeTypeGraine();
      this.recupererLesStockDeTypeSemences();
    }

  ngOnInit() {
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Marché");

    this.tout = true;

    this.recupererTousStocks();
    this.recupererLesStockDeTypeGraine();
    this.recupererLesStockDeTypeSemences();
  }  
  


  recupererTousStocks(){
    this.stockService.recupererTousLesStocks().subscribe(data => {
      this.lesStocks = data;
      // console.log(this.lesStocks);
    })
  }

  recupererLesStockDeTypeGraine(){
    this.stockService.recupererStocksParTypeSeStocks("graine").subscribe(data =>{
      this.lesGraines  = data;
    })
  }
  

  recupererLesStockDeTypeSemences(){
    this.stockService.recupererStocksParTypeSeStocks("semence").subscribe(data =>{
      this.lesSemences  = data;
    })
  }

  afficheGraine(){
    this.graine = true;
    this.semence = false;
    this.tout = false;
  }

  afficheSemence(){
    this.semence = true;
    this.graine = false;
    this.tout = false;
  }

  afficheTout(){
    this.tout = true;
    this.graine = false;
    this.semence = false;
  }


}
