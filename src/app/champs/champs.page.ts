import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController, IonRefresher } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChampService } from '../services/champ.service';
import { ChargementService } from '../services/chargement.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.page.html',
  styleUrls: ['./champs.page.scss'],
})
export class ChampsPage implements OnInit {
  // @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;

  // refreshPage() {
  //   this.refresher.complete();
  // }

  // doRefresh(event:any) {
  //   console.log('Begin async operation');
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }

  currentUser:any;
  champUserActuel:any;
  existe:boolean | undefined
  resultatFermetureCompte: any;
  form: any;
  file:any;

  nouveauPhoto:any
  reponseUpdatePhoto:any;
  photo: any;
  transporteur:boolean | undefined;

  constructor(
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    public donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private chargementService: ChargementService,
    private userService: AuthentificationService ,
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();

         
    if( this.currentUser.roles.includes("ROLE_TRANSPORTEUR") == true){
      this.transporteur = true;
    }else{
      this.transporteur = false;
    }

   // alert("je suis actualiser par init")
   this.recuperChampDunAgriculteur();

   this.donneesService.photoProfil$.subscribe(value => {
    this.photo = value;
  });
  }

  ionViewDidEnter(){
    // alert("je suis actualiser par did")
   }
 
   ionViewWillEnter(){
     //alert("je suis actualiser par will")
     this.recuperChampDunAgriculteur();

    this.donneesService.photoProfil$.subscribe(value => {
      this.photo = value;
      //this.donneesService.photoProfil.next(this.currentUser.photo);

    });
   }


   //l'objet form froup li?? ?? mon formulaire dans le template
   myForm = new FormGroup({ 
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
});

get fProfil() {
  return this.myForm.controls;
}


onFileChangeProfil(event: any) {

  if (event.target.files.length > 0) {

    const file = event.target.files[0];

    this.myForm.patchValue({

      fileSource: file

    });

    this.submitForm();

  }

}

submitForm() {
  //verifie si le formulaire est valide
  if(this.myForm.valid) {
    this.file = this.myForm.controls.fileSource.value;

    const data1:FormData=new FormData();

    // console.log("mon fichier: " + this.file)
    data1.append('file', this.file);
    
    Swal.fire({
      text: 'Etes vous s??r enregistrer cette photo',
      showDenyButton: true,
      confirmButtonText: 'Enregistrer',
      denyButtonText: `Annuler`,
      heightAuto:false,
      position:'center'
    }).then((result) => {
      if (result.isConfirmed) {         
        this.userService.modifierPhotoProfil(this.currentUser.id, data1).subscribe(value =>{
          this.reponseUpdatePhoto = value;
          
          ///si l'ajout du champ a march??
          if(this.reponseUpdatePhoto.status == 1 ){

            setTimeout(() => {
            // console.log("data photo: " + this.reponseUpdatePhoto.message)
           
            this.currentUser.photo = this.reponseUpdatePhoto.message;

            this.donneesService.photoProfil.next( this.currentUser.photo);
            this.donneesService.photoProfil$.subscribe(value => {
              this.photo = value;
            });

            // console.log(this.currentUser)
            this.storageService.saveUser(this.currentUser);

          }, 1000);

            Swal.fire({
              icon: 'success',
              text: "Modification re??u",
              // showConfirmButton: true,
              timer: 2000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            })
            this.navCtrl.navigateRoot([{clearHistory: true}]);
          }else{
            Swal.fire({
              icon: 'info',
              text: "Echec",
              showConfirmButton: true,
              // timer: 2000,
              heightAuto:false,
            })
          }
          
        })                
      } 
    })
  }

}


 

  recuperChampDunAgriculteur(){
    this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data =>{
      //on met les donnee du champ de l'user actuel dns le stockage
      this.donneesService.lesChampsDeLuserActuel.next(data);
      
      //on souscrit ?? cette observable pour youjours recuperer les donn??es ?? temps r??elle
      this.donneesService.lesChampsDeLuserActuel$.subscribe(value => {
        this.champUserActuel = value;
      });
    //  console.log("test test value" +this.champUserActuel)
      if(this.champUserActuel.length > 0){
        this.existe=true;
        this.storageService.saveChamps(this.champUserActuel);
      
      }else{
        this.existe=false;
      }
    })

    

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
    //  console.log(JSON.stringify(result));
     this.ngOnInit();
    });
    await modal.present();
  }



   //deconnexion
   deconnexion(){
    this.storageService.clean();
    if(this.currentUser.sesouvenir == true){
      this.router.navigateByUrl("/bienvenue");
    }else{
      this.router.navigateByUrl("/connexion");
    }
    
  }


}


