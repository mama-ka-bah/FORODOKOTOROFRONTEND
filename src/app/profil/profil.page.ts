import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController, IonRefresher, NavController, IonModal } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AjouterChampComponent } from '../ajouter-champ/ajouter-champ.component';
import { AjouterParserelleComponent } from '../ajouter-parserelle/ajouter-parserelle.component';
import { AjouterStockComponent } from '../ajouter-stock/ajouter-stock.component';
import { AuthentificationService } from '../services/authentification.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

//   public fixedHeight = true;
// public fixedHeightValue = 1100;

 
  //code lié à mon modal pour gerer sa fermeture debut
  @ViewChild(IonModal) modal!: IonModal;

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }  //code lié à mon modal pour gerer sa fermeture debut





  @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;
  refreshPage() {
    this.refresher.complete();
  }

  doRefresh(event:any) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  myData = {
    name: 'keita',
    age: 23,
    address: {
        city: 'Badinko'
    },
    hobbies: ['meditation', 'musique', 'voyage']
};

reponseAjoutChamp:any
currentUser:any


  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private authentificationService: AuthentificationService,
    private storageService: StorageService,
    private router : Router,
    public loadingController: LoadingController,
    private champService: ChampService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private stockservice: StocksService
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
  }




      //modal permettant d'ajouter un champ
      async ajouterChamp() {
        const modal = await this.modalCtrl.create({
          component: AjouterChampComponent,
          componentProps: {
          data: this.myData
      }
        });
  
        modal.onDidDismiss().then((resultatAjoutChamp) => {
        
          //on met à jour les donnée du champ apres l'ajout du champ dans la la base
            this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data =>{
              this.donneesService.lesChampsDeLuserActuel.next(data);             
            });

        this.dismiss();
          this.navCtrl.navigateForward('/profil/champs')
          console.log(resultatAjoutChamp.data);
        });
    
        await modal.present();
      }




        //modal permettant d'ajouter une parserelle de champ
        async ajouterParserelle() {
          const modal = await this.modalCtrl.create({
            component: AjouterParserelleComponent,
            componentProps: {
            data: this.myData
        }
          });
    
          modal.onDidDismiss().then((idChamp) => {
            //this.router.navigateByUrl('/connexion');
            //this.ngOnInit();
            this.dismiss();
            this.router.navigate(['/profil/champs/details-champs', idChamp.data]);
             //this.router.navigate(['/profil/champs']);
            console.log(idChamp.data);
          });
      
          await modal.present();
        }




           
  //on fait appel au composant pout ajouter une nouvelle ction
  async ajouterStock() {
    const modal = await this.modalCtrl.create({
      //le composant contenant le modal
      component: AjouterStockComponent,
      //Ici on envoi l'id de cultive actuel au composant contenant le formulaire de creation de 
  //     componentProps: {
  //     data: this.idDeCultiveActuel
  // }
    });

    //Cette methode contient les 
    modal.onDidDismiss().then((result) => {
     console.log(JSON.stringify(result));
     

     this.stockservice.recupererStocksParProprietaire(this.currentUser.id).subscribe( data=>{
      this.donneesService.lesStocksDeLuserActuel.next(data);
    });

    });
    await modal.present();
  }

}
