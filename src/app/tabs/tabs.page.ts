import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { LocalNotifications } from 'capacitor-local-notifications';
import Swal from 'sweetalert2';
import { ChoisirProfilComponent } from '../choisir-profil/choisir-profil.component';
import { DevenirAgriculteurComponent } from '../devenir-agriculteur/devenir-agriculteur.component';
import { DevenirTransporteurComponent } from '../devenir-transporteur/devenir-transporteur.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  currentUser:any;
  headerTitle:any;
  reponseDemandeTrans:any
  reponseDemandeAgri:any
  agriculteur:boolean | undefined
  


  constructor(
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,


  ) {
    const currentUrl = this.router.url;
    
    const pageName = currentUrl.split('/')[1];
    this.headerTitle = donneesService.getpageActuel();

    console.log("url url url url " + this.headerTitle);


    
    // switch (currentUrl) {
    //   case '/tabs/tab1':
    //     this.headerTitle = 'FORODOKOTORO';
    //     break;
    //   case '/tabs/produit-agricoles':
    //     this.headerTitle = 'Agriculture';
    //     break;
    //   case '/tabs/transporteurs':
    //     this.headerTitle = 'Transporteurs';
    //     break;
    //     case '/tabs/marche':
    //       this.headerTitle = 'Marché';
    //       break;
    //       default: 
    //         this.headerTitle = '';
    //         break; 
    // }


  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log("url actuel " + this.router.url);

    console.log(this.currentUser.roles)

    if(this.currentUser.roles.includes("ROLE_AGRIGULTEUR") == true){
      this.agriculteur = true;
    }else{
      this.agriculteur = false;
      console.log(this.agriculteur)
    }
  }

  
  //deconnexion
  deconnexion(){
    this.storageService.clean();
    this.router.navigateByUrl("/connexion");
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

        if(typeof emailSaisie !== 'undefined'){

          console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie));
          console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie.data.donneesTransporteur[0].numeroplaque));
          console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,: " + JSON.stringify(emailSaisie.data.photo));
  
          Swal.fire({
            title: 'Etes vous sur d\'envoyer cette demande',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Envoyer',
            denyButtonText: `Annuler`,
            heightAuto:false,
            position:'center'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
  
              this.agriculteurService.devenirTransporteur(emailSaisie.data.photo, emailSaisie.data.donneesTransporteur, this.currentUser.id).subscribe(data =>{
                this.reponseDemandeTrans = data;
                console.log(data.message)
                if(data.status == 1){
                  Swal.fire({
                    icon: 'success',
                    title: data.message,
                    showConfirmButton: true,
                    timer: 2000,
                    heightAuto:false,
                  })
                }else{
                  Swal.fire({
                    icon: 'info',
                    title: data.message,
                    showConfirmButton: true,
                    // timer: 3000,
                    heightAuto:false,
                  })
                }
              })
             
            } else if (result.isDenied) {
               Swal.fire({
                    icon: 'info',
                    title: 'Demande annuler',
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
    title: 'Etes vous sur d\'envoyer cette demande',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Envoyer',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      this.agriculteurService.devenirAgriculteur(this.currentUser).subscribe(data =>{
        this.reponseDemandeAgri = data;
        console.log(data.message)
        if(data.status == 1){
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: true,
            timer: 2000,
            heightAuto:false,
          })
        }else{
          Swal.fire({
            icon: 'info',
            title: data.message,
            showConfirmButton: true,
            // timer: 3000,
            heightAuto:false,
          })
        }
      })
     
    } else if (result.isDenied) {
       Swal.fire({
            icon: 'info',
            title: 'Demande annuler',
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


}
