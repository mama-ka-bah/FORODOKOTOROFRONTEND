import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-detail-stocks',
  templateUrl: './detail-stocks.page.html',
  styleUrls: ['./detail-stocks.page.scss'],
})
export class DetailStocksPage implements OnInit {

  idStockActuel:any;
  tousLesStocksDunUserActuel:any;
  

  constructor(
    private routes : ActivatedRoute,
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private meteoservice: MeteoService,
    private stockService: StocksService
  ) { }

  date = new Date();
  formattedDate = this.date.toLocaleDateString();

  detailsStocks= {

      id:0,
      libelle:"",
      prixkilo:0,
      nombrekilo:0,
      quantiterestant:0,
      photo:"",
      disponibilite:false,
      datepublication:this.formattedDate,
      varietes:{},
      proprietaire:{}
  }



  ngOnInit() {
    this.recupererDetailStock();
  }

  // recupererDetailStocks(){
  //   this.idStockActuel = this.routes.snapshot.params['id'];
  //   console.log("element: " +  this.idStockActuel);
  //   this.tousLesStocksDunUserActuel = this.storageService.getStocks();
  //   this.detailsStocks = this.tousLesStocksDunUserActuel[this.idStockActuel-1];
  //   console.log("element: " +  this.detailsStocks);
  // }

  recupererDetailStock(){
    this.idStockActuel = this.routes.snapshot.params['id'];
    this.stockService.recupererStockParId(this.idStockActuel).subscribe(data =>{
      this.detailsStocks = data;
    })
  }

}
