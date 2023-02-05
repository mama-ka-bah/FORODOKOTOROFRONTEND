import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController, IonRefresher } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChampService } from '../services/champ.service';
import { ChargementService } from '../services/chargement.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.page.html',
  styleUrls: ['./champs.page.scss'],
})
export class ChampsPage implements OnInit {
  // @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;

  // refreshPage() {
  //   this.refresher.complete();
  // }

  // doRefresh(event:any) {
  //   console.log('Begin async operation');
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }

  currentUser:any;
  champUserActuel:any;
  existe:boolean | undefined
  resultatFermetureCompte: any;
  form: any;

  constructor(
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private chargementService: ChargementService,
    private userService: AuthentificationService 
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
   // alert("je suis actualiser par init")
   this.recuperChampDunAgriculteur();
  }

  ionViewDidEnter(){
   // alert("je suis actualiser par did")
  }

  ionViewWillEnter(){
    //alert("je suis actualiser par will")
    this.recuperChampDunAgriculteur();
  }

  recuperChampDunAgriculteur(){
    this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data =>{
      //on met les donnee du champ de l'user actuel dns le stockage
      this.donneesService.lesChampsDeLuserActuel.next(data);
      
      //on souscrit à cette observable pour youjours recuperer les données à temps réelle
      this.donneesService.lesChampsDeLuserActuel$.subscribe(value => {
        this.champUserActuel = value;
      });
     
      if(this.champUserActuel == null){
        this.existe=false;
      }else{
        this.existe=true;
        this.storageService.saveChamps(this.champUserActuel);
      }
    })

    

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



   //deconnexion
   deconnexion(){
    this.storageService.clean();
    if(this.currentUser.sesouvenir == true){
      this.router.navigateByUrl("/bienvenue");
    }else{
      this.router.navigateByUrl("/connexion");
    }
    
  }


}


