import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjoutConseilComponent } from '../ajout-conseil/ajout-conseil.component';

@Component({
  selector: 'app-communautes',
  templateUrl: './communautes.page.html',
  styleUrls: ['./communautes.page.scss'],
})
export class CommunautesPage implements OnInit {

  constructor(    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
  }


   //on fait appel au composant pout ajouter une nouvelle ction
   async ajouterConseil() {
    const modal = await this.modalCtrl.create({
      //le composant contenant le modal
      component: AjoutConseilComponent,
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
