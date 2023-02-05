import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-profil-transporteur',
  templateUrl: './profil-transporteur.page.html',
  styleUrls: ['./profil-transporteur.page.scss'],
})
export class ProfilTransporteurPage implements OnInit {

  currentUser:any

  constructor(
    private storageService : StorageService,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
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
