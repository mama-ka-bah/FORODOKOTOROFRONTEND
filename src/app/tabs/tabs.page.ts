import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { IonModal, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { LocalNotifications } from 'capacitor-local-notifications';
import Swal from 'sweetalert2';
import { ChoisirProfilComponent } from '../choisir-profil/choisir-profil.component';
import { DevenirAgriculteurComponent } from '../devenir-agriculteur/devenir-agriculteur.component';
import { DevenirTransporteurComponent } from '../devenir-transporteur/devenir-transporteur.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChargementService } from '../services/chargement.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { NotificationService } from '../services/notification.service';
import { StorageService } from '../services/stockage.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{   
  //code lié à mon modal pour gerer sa fermeture debut
  @ViewChild(IonModal) modal!: IonModal;
  rolutilisateur: string[] = [];

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }  //code lié à mon modal pour gerer sa fermeture debut


  // closeModal() {
  //   this.myModal.dismiss();
  // }

  currentUser:any;
  headerTitle:any;
  reponseDemandeTrans:any
  reponseDemandeAgri:any
  agriculteur:boolean | undefined
  nombreDeNotificationNonLu:any
  boollNbreNotif:boolean | undefined
  notifiExiste:boolean | undefined

  currentUrl:any
  photoExiste:any
  photo:any

  conditionAfichageMenu:boolean | undefined;


  constructor(
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    public donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private notificationService: NotificationService,
    private chargementService: ChargementService,
    public loadingController: LoadingController,
    private authentificationService: AuthentificationService,
  ) {
    
    this.currentUser = this.storageService.getUser();

    // alert(this.currentUser.nomcomplet)

    this.notificationService.recupererNotificationNonLuDunUser(this.currentUser.id).subscribe(data =>{
      this.nombreDeNotificationNonLu = data;
      // alert(data)
      this.donneesService.nombreDeNotificationNonLu.next(this.nombreDeNotificationNonLu);
     
    })


   }


  navigateToPage1() {
    // Navigate to page 1
  }

  navigateToPage2() {
    // Navigate to page 2
  }

  
//cest did enter qui etetait là
  ionViewWillEnter(){
    this.donneesService.rolesUser.next(this.currentUser.roles);
    this.donneesService.showMenu.next(true);
    this.donneesService.showMenu$.subscribe(value => {
      this.conditionAfichageMenu = value;
    });


    //this.donneesService.photoProfil.next(this.currentUser.photo);
    this.donneesService.photoProfil$.subscribe(value => {
      this.photo = value;
    });

   // this.donneesService.photoProfil.next(this.currentUser.photo);


    // alert(this.currentUser.nomcomplet)
    this.verifierExistancePhotoProfil();

      
    if( this.rolutilisateur.includes("ROLE_AGRIGULTEUR") == true){
      this.agriculteur = true;
    }else{
      this.agriculteur = false;
    }

    if(this.nombreDeNotificationNonLu > 9){
      this.boollNbreNotif = true
    }else{
      this.boollNbreNotif =false
    }
   
    this.donneesService.nombreDeNotificationNonLu$.subscribe(value => {
      this.nombreDeNotificationNonLu = value;
    });


    if(this.nombreDeNotificationNonLu > 9){
      this.boollNbreNotif = true
    }else{
      this.boollNbreNotif =false
    }

    if(this.nombreDeNotificationNonLu > 0){
      this.notifiExiste = true
    }else{
      this.boollNbreNotif =false
    }
  }
  
//  public reccupererTitreAccueil(){
//     this.headerTitle = "FORODOKOTORO";
//   }
//   public reccupererTitreAgriculture(){
//     this.headerTitle = "AGRICULTURE";
//   }
//   public reccupererTitreMarche(){
//     this.headerTitle = "MARCHE";
//   }
//   public reccupererTitreTransporteur(){
//     this.headerTitle = "TRANSPORTS";
//   }


verifierExistancePhotoProfil(){
  if(this.currentUser.photo){
    this.photoExiste = true;
  }else{
    this.photoExiste =false;
  }
  
}

  ngOnInit(): void {  
    this.currentUser = this.storageService.getUser();
   
    this.verifierExistancePhotoProfil();

    
    this.storageService.saveCurrentUrl(this.currentUrl);
    this.currentUser = this.storageService.getUser();

      this.donneesService.photoProfil$.subscribe(value => {
        this.photo = value;
      });


    // if( this.rolutilisateur.includes("ROLE_AGRIGULTEUR") == true){
    //   this.agriculteur = true;
    // }else{
    //   this.agriculteur = false;
    // }

    this.donneesService.nombreDeNotificationNonLu$.subscribe(value => {
      this.nombreDeNotificationNonLu = value;
    });

    
    // this.donneesService.showMenu.next(true);
   
    this.donneesService.showMenu$.subscribe(value => {
      this.conditionAfichageMenu = value;
    });

    this.donneesService.headerTitle$.subscribe(value => {
      this.headerTitle = value;
    });

    this.donneesService.rolesUser$.subscribe(value => {
      this.rolutilisateur = value;
    });
   
    // if( this.rolutilisateur.includes("ROLE_AGRIGULTEUR") == true){
    //   this.agriculteur = true;
    // }else{
    //   this.agriculteur = false;
    // }

    
    this.currentUrl = this.router.url;
    // this.headerTitle = this.currentUrl;
    this.storageService.saveCurrentUrl(this.currentUrl);

    switch (this.currentUrl) {
      case '/tabs/tab1':
        this.headerTitle = 'FORODOKOTORO';
        break;
      case '/tabs/produit-agricoles':
        this.headerTitle = 'AGRICULTURE';
        break;
      case '/tabs/transporteurs':
        this.headerTitle = 'TRANSPORTS';
        break;
        case '/tabs/marche':
          this.headerTitle = 'MARCHE';
          break;
        case '/tabs/communautes':
          this.headerTitle = 'CONSEILS';
          break;
          default: 
            this.headerTitle = '';
            this.donneesService.showMenu.next(false);
            break; 
    }

    console.log(this.currentUser.roles)

    if(this.storageService.getCurrentUrl() == "/tabs/tab1" || this.storageService.getCurrentUrl() == "/tabs/produit-agricoles" || this.storageService.getCurrentUrl() == "/tabs/transporteurs" || this.storageService.getCurrentUrl() == "/tabs/marche"){
      this.conditionAfichageMenu = true;
    }else{
      this.conditionAfichageMenu = false;
    }

  }

reloadPage(): void {
  window.location.reload();
}

  //deconnexion
  deconnexion(){
   
    if(this.currentUser.sesouvenir == true){
      this.storageService.clean();
      localStorage.clear();
      this.navCtrl.navigateRoot([{clearHistory: true}]);

      const user = {
        "sesouvenir":false
      }

      this.authentificationService.modifierProfilUtilisateur(this.currentUser.id, user).subscribe(value1 =>{
       console.log(value1);
      })

      this.router.navigateByUrl("/connexion");
    }else{
      this.storageService.clean();
      this.navCtrl.navigateRoot([{clearHistory: true}]);
      this.router.navigateByUrl("/connexion");
    }
    
  }





  myData = {
    name: 'keita',
    age: 23,
    address: {
        city: 'Badinko'
    },
    hobbies: ['meditation', 'musique', 'voyage']
  };
  
    // Cette methode est utiliser pour creer un modal, on peut lui passer
    //  des parametres et il peut également recuperer des données envoyer par le composant 
    async presentModal() {
      const modal = await this.modalCtrl.create({
  
        //le composant contenant le modal
        component: DevenirTransporteurComponent,
  
        //Ici on envoi l'objet myData au composant
        componentProps: {
        data: this.myData
    }
      });
  
      //Cette methode contient les 
      modal.onDidDismiss().then((emailSaisie) => {

        if(emailSaisie.data){

          // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie));
          // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie.data.donneesTransporteur[0].numeroplaque));
          // console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie.data.photo));
  
          Swal.fire({
            text: 'Etes vous sur d\'envoyer cette demande',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Envoyer',
            denyButtonText: `Annuler`,
            heightAuto:false,
            position:'center'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.presentLoading();
              this.agriculteurService.devenirTransporteur(emailSaisie.data.photo, emailSaisie.data.donneesTransporteur, this.currentUser.id).subscribe(data =>{
                this.reponseDemandeTrans = data;

                this.notificationService.recupererNotificationNonLuDunUser(data.id).subscribe(data =>{
                  this.nombreDeNotificationNonLu = data;
                  // alert(data)
                  this.donneesService.nombreDeNotificationNonLu.next(this.nombreDeNotificationNonLu);
                  this.donneesService.nombreDeNotificationNonLu$.subscribe(value => {
                    this.nombreDeNotificationNonLu = value;
                  });

                  this.dismissLoading();
                 
                })

                console.log(data.message)
                if(data.status == 1){
                  Swal.fire({
                    icon: 'success',
                    text: data.message,
                    showConfirmButton: true,
                    // timer: 2000,
                    heightAuto:false,
                  })

                }else{
                  Swal.fire({
                    icon: 'info',
                    text: data.message,
                    showConfirmButton: true,
                    // timer: 3000,
                    heightAuto:false,
                  })
                }
              })
             
            } else if (result.isDenied) {
               Swal.fire({
                    icon: 'info',
                    text: 'Demande annuler',
                    showConfirmButton: true,
                    // timer: 3000,
                    heightAuto:false,
                  })
            }
          })

        }
      
        
      });
      //ceci retourne le present modal lorsqu'on fait appelle à cette fonction
      await modal.present();
      //  return await modal.present();
    }



     //popup
  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DevenirAgriculteurComponent,
      event: ev,
      translucent: true,
      componentProps: {
        data: 'Data passed to PopoverPage'
      }
    });

    popover.onDidDismiss().then((data) => {
      console.log(data.data);

if(data.data.etat == true){

  Swal.fire({
    text: 'Etes vous sur d\'envoyer cette demande',
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Envoyer',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.presentLoading();
      this.agriculteurService.devenirAgriculteur(this.currentUser).subscribe(data =>{
        this.reponseDemandeAgri = data;


        this.notificationService.recupererNotificationNonLuDunUser(data.id).subscribe(data =>{
          this.nombreDeNotificationNonLu = data;
          // alert(data)
          this.donneesService.nombreDeNotificationNonLu.next(this.nombreDeNotificationNonLu);
          this.donneesService.nombreDeNotificationNonLu$.subscribe(value => {
            this.nombreDeNotificationNonLu = value;
          });

          this.dismissLoading();
         
        })

        console.log(data.message)
        if(data.status == 1){
          Swal.fire({
            icon: 'success',
            text: data.message,
            showConfirmButton: true,
            // timer: 2000,
            heightAuto:false,
          })


        }else{
          Swal.fire({
            icon: 'info',
            text: data.message,
            showConfirmButton: true,
            // timer: 3000,
            heightAuto:false,
          })
        }
      })
     
    } else if (result.isDenied) {
       Swal.fire({
            icon: 'info',
            text: 'Demande annuler',
            showConfirmButton: true,
            // timer: 3000,
            heightAuto:false,
          })
    }
  })

}
      
  });

  

    return await popover.present();
  }




   //loading controlleur utilise pour montrer à l'user que le programme est en cours de chargement
 async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Patienter...',
    duration: 5000
  });
  await loading.present();

  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed!');
}

async dismissLoading() {
  await this.loadingController.dismiss();
}


}
