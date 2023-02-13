import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AjoutConseilComponent } from '../ajout-conseil/ajout-conseil.component';
import { CommunauteService } from '../services/communaute.service';

@Component({
  selector: 'app-communautes',
  templateUrl: './communautes.page.html',
  styleUrls: ['./communautes.page.scss'],
})
export class CommunautesPage implements OnInit {

  lesPublivationsOrdonnes:any;

  //pour la pagination et la recherche
  p: number = 1;
  searchTerm:any
  filterTerm:any;


  constructor(
    private modalCtrl: ModalController,
    private communauteService: CommunauteService

    ) { }

  ngOnInit() {
    this.recueperLesPublications();
  }

  recueperLesPublications(){
    this.communauteService.recupererToutesLesPublicationsOrdonneesParDatePub().subscribe(data =>{
      this.lesPublivationsOrdonnes = data;
    })
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
