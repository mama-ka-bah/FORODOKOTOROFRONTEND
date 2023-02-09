import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { DevenirAgriculteurComponent } from '../devenir-agriculteur/devenir-agriculteur.component';
import { EvolutionStockComponent } from '../evolution-stock/evolution-stock.component';
import { MettreAjourStockComponent } from '../mettre-ajour-stock/mettre-ajour-stock.component';
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

    //pour retourner en arriere
retourner() {
  this.navCtrl.back();
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




  // Cette methode est utiliser pour creer un modal, on peut lui passer
    //  des parametres et il peut également recuperer des données envoyer par le composant 
    async evolutionStock() {
      const modal = await this.modalCtrl.create({
  
        //le composant contenant le modal
        component: EvolutionStockComponent,
  
        //Ici on envoi l'objet myData au composant
        componentProps: {
          data: this.idStockActuel,
    }
      });
  
      //Cette methode contient les 
      modal.onDidDismiss().then((emailSaisie) => {
      })
      await modal.present();
    }


     //popup
     async mettreAjourSonStock(ev: any) {
      const popover = await this.popoverController.create({
        component: MettreAjourStockComponent,
        event: ev,
        translucent: true,
        componentProps: {
          data: this.idStockActuel,
          data1:this.detailsStocks
        }
      });

      await popover.present();
  
      popover.onDidDismiss().then((data) => {
        console.log(data.data);
     })

    }



      // //popup
      // async evolutionStock(ev: any) {
      //   const popover = await this.popoverController.create({
      //     component: MettreAjourStockComponent,
      //     event: ev,
      //     translucent: true,
      //     componentProps: {
      //       data: this.idStockActuel,
      //       data1:this.detailsStocks
      //     }
      //   });
  
      //   await popover.present();
    
      //   popover.onDidDismiss().then((data) => {
      //     console.log(data.data);
      //  })
  
      // }
  

    

}
