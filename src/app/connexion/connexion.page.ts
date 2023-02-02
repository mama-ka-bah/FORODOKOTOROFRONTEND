import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChangerMotDePasseComponent } from '../changer-mot-de-passe/changer-mot-de-passe.component';
import { InputotpComponent } from '../inputotp/inputotp.component';
import { Otp } from '../Models/Otp.model';
import { OtpComponent } from '../otp/otp.component';
import { AuthentificationService } from '../services/authentification.service';
import { StorageService } from '../services/stockage.service';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  myData = {
    name: 'keita',
    age: 23,
    address: {
        city: 'Badinko'
    },
    hobbies: ['meditation', 'musique', 'voyage']
};

//le code otp generé et retourner par le backend
codeRetourne: any;

 objetOtp = new Otp();


  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private authentificationService: AuthentificationService,
    private storageService: StorageService,
    private router : Router,
    public loadingController: LoadingController
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
      modal.onDidDismiss().then((emailSaisie) => {

        // this.presentLoading();

        // this.dataRetour = JSON.stringify(retour);
        // console.log(this.dataRetour);

        this.objetOtp.email = emailSaisie.data.data.email;

        this.presentLoading()
        //demande de renitialisation du mot de passe au backend
      this.authentificationService.motdepasseoublier(this.objetOtp).subscribe( data => {
          
        //le retour du backend
        this.objetOtpRetourner = data;

        this.dismissLoading();
        
        if(this.objetOtpRetourner.status == 1){
          //Ici J'ouvre un autre modal lors de la fermeture(validation) du present modal
         
          this.presentModal1();

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: this.objetOtpRetourner.message,
            heightAuto:false
          });
        }

      });
        
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
        const codeSaisie = resultatConfirmation.data.data.code1.toString() + resultatConfirmation.data.data.code2.toString() +
         resultatConfirmation.data.data.code3.toString() +resultatConfirmation.data.data.code4.toString();
        const codeGenerer = this.objetOtpRetourner.code.toString;

        console.log("codeSaisie " + codeSaisie)
        console.log("codeGenerer " + this.objetOtpRetourner.code)

        if(codeSaisie == this.objetOtpRetourner.code){
          this.presentModal2();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Code invalide !',
            heightAuto:false
          });
        }

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
        console.table(this.objetOtpRetourner.iduser);

        const objeAEnvoyer = {
          "password":resultatConfirmation.data.data.motDePasse
        }
        this.presentLoading()
        this.authentificationService.modifierMotDePasse(this.objetOtpRetourner.iduser, objeAEnvoyer).subscribe(data =>{
          console.log(data);
          this.dismissLoading()
        });

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Mot de passe modifié avec succès',
          showConfirmButton: false,
          timer: 2000,
          heightAuto:false
        })

        this.router.navigateByUrl('/connexion');

      });
  
      await modal.present();
    }


  ngOnInit() {

    //ici on verifie si l'utilisateur existe
    if (this.storageService.isLoggedIn()) {
      //on met le boolean "isLoggedIn" à true
      this.isLoggedIn = true;
      //on recupere les roles de l'utilisateur
      this.roles = this.storageService.getUser().roles;
    }

  }

// });

//declaration de l'objet qui recevra mes donnée

  username: any;
  password: any;

  envoyer:boolean | undefined;

  objetOtpRetourner:any;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
  });

//boolean utiliser pour verifier si l'utilisateur est connecter ou pas
isLoggedIn = false;
//boolean utiliser pour verifier si la connexion a marché ou pas
isLoginFailed = false;
//variavble utilisée pour stocker les messages d'erreur
errorMessage = '';
//cette variable va stocker les données de l'utilisateur
roles: string[] = [];

onSubmit(): void {

  this.envoyer = true;

  this.username = this.form.controls.username.value;
  this.password = this.form.controls.password.value;

  if(this.form.valid){

    //on envoie les l'username et le password au service d'authentification
    this.authentificationService.login(this.username, this.password).subscribe({
      //on arrive là s'il y a pas déerreur
      next: data => {
        //si la connexion s'est bien passé on enregistre les données de l'utilisateur dans sessionStorage
        this.storageService.saveUser(data);

        //Et on attribut des données réelles à ces differents bollean
        this.isLoginFailed = false;// on precise que l'authentification n'a pas echouer
        this.isLoggedIn = true; //on met le boolean est connecte à true
        this.roles = this.storageService.getUser().roles;// on recuperes les differentes roles de l'utilisateurs

       this.form.reset();
        this.router.navigateByUrl('/tabs/tab1');
        //this.reloadPage();//ici on recharge la page
      },
      error: err => {
        //en cas d'erreur d'erreur
        this.errorMessage = err.error.message;
        //et on met est authentifié à false
        this.isLoginFailed = true;
      }
    });
    
  }

}

//fonction utilisée pour recharger la page
reloadPage(): void {
  window.location.reload();
}

 //loading controlleur utilise pour montrer à l'user que le programme est en cours de chargement
 async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Patienter...',
    // duration: 3000
  });
  await loading.present();

  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed!');
}

async dismissLoading() {
  await this.loadingController.dismiss();
}

}


