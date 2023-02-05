import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { DetailStocksPage } from '../detail-stocks/detail-stocks.page';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stockprofil',
  templateUrl: './stockprofil.page.html',
  styleUrls: ['./stockprofil.page.scss'],
})
export class StockprofilPage implements OnInit {

  
  currentUser:any;
  stocksUserActuel: any;
  existe:boolean | undefined

  constructor(private stocksService: StocksService,

      private router : Router,
      private storageService : StorageService,
      private navCtrl: NavController,
      private donneesService: DonneesStockerService,
      private modalCtrl: ModalController,
      private agriculteurService: AgriculteurService,
      public popoverController: PopoverController,
      private champService: ChampService
    ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.recuperStockDunAgriculteur();
  }

  //pour retourner en arriere
retourner() {
  this.navCtrl.back();
}


  recuperStockDunAgriculteur(){
    this.stocksService.recupererStocksParProprietaire(this.currentUser.id).subscribe( (data) =>{
      this.stocksUserActuel =  data;
      // retour = JSON.stringify(data);
      // this.stocksUserActuel =  JSON.parse(retour);
      console.log(this.stocksUserActuel)

      if(this.stocksUserActuel.length === 0){
        this.existe=false;
        console.log("Je ne suis pas là: " + this.stocksUserActuel.length)
      }else{
        this.existe=true;
        
        console.log("Je suis là: " + this.stocksUserActuel.length);

        this.storageService.saveStocks(this.stocksUserActuel);

      }

    });
  }


  
  fermerCompte(){   
    this.donneesService.fermerUnCompte(this.currentUser.id);
  }


   //on fait appel au composant pout ajouter une nouvelle ction
   async modifierProfil() {
    const modal = await this.modalCtrl.create({
      //le composant contenant le modal
      component: ModifierProfilComponent,
      //Ici on envoi l'id de cultive actuel au composant contenant le formulaire de creation de 
  //     componentProps: {
  //     data: this.idDeCultiveActuel
  // }
    });

    //Cette methode contient les 
    modal.onDidDismiss().then((result) => {
     console.log(JSON.stringify(result));
     this.ngOnInit();
    });
    await modal.present();
  }

}
