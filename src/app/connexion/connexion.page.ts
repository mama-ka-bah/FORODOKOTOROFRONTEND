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
import { ChargementService } from '../services/chargement.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { NotificationService } from '../services/notification.service';
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
  resultatOuvertureCompte: any;
  nombreDeNotificationNonLu: any;


  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private authentificationService: AuthentificationService,
    private storageService: StorageService,
    private router : Router,
    public loadingController: LoadingController,
    private donneesService: DonneesStockerService,
    private notificationService: NotificationService,
    private chargementService: ChargementService
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
        if(resultatConfirmation.data.data == 0){
          this.objetOtpRetourner.validite = false;
        }
        const codeSaisie = resultatConfirmation.data.data.code1.toString() + resultatConfirmation.data.data.code2.toString() +
         resultatConfirmation.data.data.code3.toString() +resultatConfirmation.data.data.code4.toString();
        const codeGenerer = this.objetOtpRetourner.code.toString;

        // console.log("codeSaisie " + codeSaisie)
        // console.log("codeGenerer " + this.objetOtpRetourner.code)

        if(codeSaisie == this.objetOtpRetourner.code && this.objetOtpRetourner.validite == true){
          this.presentModal2();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Code invalide !',
            heightAuto:false
          });
        }

        // console.log("Je suis le contenu de la page: " + resultatConfirmation.data.data.code1);
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

        // console.log("Je suis le contenu de la page: " + resultatConfirmation.data.data.motDePasse);
        // console.table(this.objetOtpRetourner.iduser);

        const objeAEnvoyer = {
          "password":resultatConfirmation.data.data.motDePasse
        }
        // alert("le pss à envoyer: " + JSON.stringify(objeAEnvoyer))
        this.chargementService.presentLoading();
        this.authentificationService.modifierMotDePasse(this.objetOtpRetourner.iduser, objeAEnvoyer).subscribe(data =>{
          // console.log(data);
          this.chargementService.dismissLoading();
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
    this.isLoggedIn = false;
    this.isLoginFailed = false;

    //ici on verifie si l'utilisateur existe
    if (this.storageService.isLoggedIn()) {
      //on met le boolean "isLoggedIn" à true
      this.isLoggedIn = true;
      //on recupere les roles de l'utilisateur
      this.roles = this.storageService.getUser().roles;
    }

    const usernameDansStorage =  localStorage.getItem("forousername");
    const passwordDansLocalStorage =  localStorage.getItem("foropass");

    if(usernameDansStorage && passwordDansLocalStorage){
      this.username = usernameDansStorage;
      this.password = passwordDansLocalStorage;
      this.authentification(this.username, this.password);
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
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
    sesouvenir: new FormControl(false),
  });

  renitialiserFormulaire(){
    this.form.reset();
  }

//boolean utiliser pour verifier si l'utilisateur est connecter ou pas
isLoggedIn = false;
//boolean utiliser pour verifier si la connexion a marché ou pas
isLoginFailed = false;

bool = false;

//variavble utilisée pour stocker les messages d'erreur
errorMessage = '';
//cette variable va stocker les données de l'utilisateur
roles: string[] = [];

onSubmit(): void {
  // this.bool = true;
  this.envoyer = true;
  this.isLoggedIn = true;
 

  this.username = this.form.controls.username.value;
  this.password = this.form.controls.password.value;

  if(this.form.valid){
   this.authentification(this.username, this.password);    
    //  this.renitialiserFormulaire();
   //this.router.navigateByUrl('/tabs/tab1');

  }

}


authentification(username:any, password:any){
      //on envoie les l'username et le password au service d'authentification
      this.authentificationService.login(username, password).subscribe({
        //on arrive là s'il y a pas déerreur
        next: data => {
          if(data.etat == true){
            this.renitialiserFormulaire()
            //si la connexion s'est bien passé on enregistre les données de l'utilisateur dans sessionStorage
          this.storageService.saveUser(data);
          //Et on attribut des données réelles à ces differents bollean
          this.isLoginFailed = false;// on precise que l'authentification n'a pas echouer
          this.isLoggedIn = true; //on met le boolean est connecte à true
        
          // alert(this.isLoggedIn)
          this.roles = this.storageService.getUser().roles;// on recuperes les differentes roles de l'utilisateurs

          this.donneesService.rolesUser.next(data.roles);

          this.donneesService.photoProfil.next(data.photo);

          this.notificationService.recupererNotificationNonLuDunUser(data.id).subscribe(data =>{
            this.nombreDeNotificationNonLu = data;
            // alert(data)
            this.donneesService.nombreDeNotificationNonLu.next(this.nombreDeNotificationNonLu);
           
          })
  
          if(this.form.controls.sesouvenir.value){
            localStorage.setItem("forousername", this.username);
            localStorage.setItem("foropass", this.password);

            const user = {
              "sesouvenir":true
            }

            this.authentificationService.modifierProfilUtilisateur(data.id, user).subscribe(value1 =>{
            //  console.log(value1);
            })
          }
  
          const jwts = {
            "token": this.storageService.getUser().token
          }
         
          this.storageService.SaveJwts(jwts);
  
         this.form.reset();

          this.router.navigateByUrl('/tabs/tab1');
          //this.reloadPage();//ici on recharge la page
          }else{
            
        Swal.fire({
          text: 'Votre compte est fermer voulez vous l\'ouvrir',
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: 'Ouvrir',
          denyButtonText: `Annuler`,
          heightAuto:false,
          position:'center'
        }).then((result) => {
          if (result.isConfirmed) {  
            const user = {
              "etat":true
            }
   
            this.presentLoading();
            this.authentificationService.modifierProfilUtilisateur(data.id, user).subscribe(value =>{
              this.resultatOuvertureCompte = value;
              this.dismissLoading();
              
              Swal.fire({
                icon: 'success',
                text: "Compte ouvert avec succès",
                // timer: 2000,
                customClass: {
                  container: 'small-text'
                },
                heightAuto:false,
              });
             
              this.storageService.saveUser(this.resultatOuvertureCompte);
  
              const jwts = {
                "token": this.storageService.getUser().token
              }
  
              this.storageService.SaveJwts(jwts);

              this.router.navigateByUrl('/tabs/tab1');
            })
          } 
        })
          }  
        },
        error: err => {
          //en cas d'erreur d'erreur
          this.errorMessage = err.error.message;
          //et on met est authentifié à false
          this.isLoginFailed = true;

          this.isLoggedIn = false; //on met le boolean est connecte à true
          this.bool = true;
          // alert("true");
        }
      });
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


