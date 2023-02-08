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

  lesStocks:any

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

     searchTerm:any

     ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
    }

  ngOnInit() {
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Marché");
    this. recupererTousStocks();
  }

  recupererTousStocks(){
    this.stockService.recupererTousLesStocks().subscribe(data => {
      this.lesStocks = data;
      console.log(this.lesStocks);
    })
  }

}
