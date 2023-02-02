import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController, LoadingController } from '@ionic/angular';
import { AjouterChampComponent } from '../ajouter-champ/ajouter-champ.component';
import { AjouterParserelleComponent } from '../ajouter-parserelle/ajouter-parserelle.component';
import { AuthentificationService } from '../services/authentification.service';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {


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
    private champService: ChampService
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
          //this.router.navigateByUrl('/connexion');
          this.ngOnInit();
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
    
          modal.onDidDismiss().then((resultatAjoutChamp) => {
            //this.router.navigateByUrl('/connexion');
            this.ngOnInit();
            console.log(resultatAjoutChamp.data);
          });
      
          await modal.present();
        }

}
