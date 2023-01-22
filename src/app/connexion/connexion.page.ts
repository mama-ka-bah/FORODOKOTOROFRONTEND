import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ChangerMotDePasseComponent } from '../changer-mot-de-passe/changer-mot-de-passe.component';
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

codeRetourne: any;


  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    // private tokenStorage: TokenStorageService,
    // private utilisateursService: UtilisateursService,
    private router : Router
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
      modal.onDidDismiss().then((codeRetourne) => {

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);

        //ici j'affiche les donnée retournées par mon composant
        console.log("Je suis le contenu de la page: " + codeRetourne.data.data.email);

        //Ici J'ouvre un autre modal lors de la fermeture(validation) du present modal
        this.presentModal1();
      });
  
      //ceci retourne le present modal lorsqu'on fait appelle à cette fonction
      await modal.present();
      //  return await modal.present();
    }


//ceci est mon deuxieme modale qui appelle à la validation de premier explique en haut pour que l'utiisateur puisse taper le code qui lui a été envoyer
    async presentModal1() {
      const modal = await this.modalCtrl.create({
        component: InputotpComponent,
        componentProps: {
        data: this.myData
    }
      });

      modal.onDidDismiss().then((resultatConfirmation) => {

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);
        this.presentModal2();

        console.log("Je suis le contenu de la page: " + resultatConfirmation.data.data.code1);
      });
  
      await modal.present();
    }


    //ceci est mon troisieme modale(qui permet de changer le mot passe) qui est appelle à la validation du  explique en haut
    async presentModal2() {
      const modal = await this.modalCtrl.create({
        component: ChangerMotDePasseComponent,
        componentProps: {
        data: this.myData
    }
      });

      modal.onDidDismiss().then((resultatConfirmation) => {

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);

        console.log("Je suis le contenu de la page: " + resultatConfirmation.data.data.motDePasse);
      });
  
      await modal.present();
    }


  ngOnInit() {
  }

//la gestion du formulaire de connexion

// myForm = new FormGroup({
//   telephone: new FormControl('', [Validators.required, Validators.minLength(4)]),
//   password: new FormControl('', [Validators.required, Validators.minLength(4)])
// });

//declaration de l'objet qui recevra mes donnée
form: any = {
  username: null,
  password: null
};
//boolean utiliser pour verifier si l'utilisateur est connecter ou pas
isLoggedIn = false;
//boolean utiliser pour verifier si la connexion a marché ou pas
isLoginFailed = false;
//variavble utilisée pour stocker les messages d'erreur
errorMessage = '';
//cette variable va stocker les données de l'utilisateur
roles: string[] = [];







}


