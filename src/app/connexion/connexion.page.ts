import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { InputotpComponent } from '../inputotp/inputotp.component';
import { OtpComponent } from '../otp/otp.component';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  myData = {
    name: 'John Doe',
    age: 30,
    address: {
        street: 'Main St',
        city: 'New York',
        state: 'NY'
    },
    hobbies: ['reading', 'music', 'travel']
};

dataRetour: any;


  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
    ) { }

    // Cette methode est utiliser pour creer un modal, on peut lui passer
    //  des parametres et il peut également recuperer des données envoyer par le composant 
    async presentModal() {
      const modal = await this.modalCtrl.create({

        //le composant contenant le modal
        component: OtpComponent,

        //Ici on envoi l'objet myData au composant
        componentProps: {
        data: this.myData
    }
      });

      //Cette methode contient les 
      modal.onDidDismiss().then((retour) => {

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);

        //ici j'affiche les donnée retournées par mon composant
        console.log("Je suis le contenu de la page: " + retour.data.data.email);

        //Ici J'ouvre un autre modal lors de la fermeture(validation) du present modal
        this.presentModal1();
      });
  
      //ceci retourne le present modal lorsqu'on fait appelle à cette fonction
      await modal.present();
      //  return await modal.present();
    }


//ceci est mon deuxieme modale qui appelle à la validation de premier explique en haut
    async presentModal1() {
      const modal = await this.modalCtrl.create({
        component: InputotpComponent,
        componentProps: {
        data: this.myData
    }
      });

      modal.onDidDismiss().then((retour) => {

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);

        console.log("Je suis le contenu de la page: " + retour.data.data.email);
      });
  
      await modal.present();
    }

 

  ngOnInit() {
  }

}


