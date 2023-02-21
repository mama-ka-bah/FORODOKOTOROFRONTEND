import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AuthentificationService } from '../services/authentification.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-profil-transporteur',
  templateUrl: './profil-transporteur.page.html',
  styleUrls: ['./profil-transporteur.page.scss'],
})
export class ProfilTransporteurPage implements OnInit {

  currentUser:any
  file:any;

  nouveauPhoto:any
  reponseUpdatePhoto:any;
  photo: any;


  constructor(
    private storageService : StorageService,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private userService: AuthentificationService 

    ) { }


    ionViewWillEnter(){
      this.donneesService.photoProfil.next(this.currentUser.photo);
     this.donneesService.photoProfil$.subscribe(value => {
       this.photo = value;
     });
    }




       //l'objet form froup lié à mon formulaire dans le template
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
      text: 'Etes vous sûr enregistrer cette photo',
      showDenyButton: true,
      confirmButtonText: 'Enregistrer',
      denyButtonText: `Annuler`,
      heightAuto:false,
      position:'center'
    }).then((result) => {
      if (result.isConfirmed) {         
        this.userService.modifierPhotoProfil(this.currentUser.id, data1).subscribe(value =>{
          this.reponseUpdatePhoto = value;
          
          ///si l'ajout du champ a marché
          if(this.reponseUpdatePhoto.status == 1 ){

            // console.log("data photo: " + this.reponseUpdatePhoto.message)
         
            
            this.currentUser.photo = this.reponseUpdatePhoto.message;

            this.donneesService.photoProfil.next( this.currentUser.photo);
            this.donneesService.photoProfil$.subscribe(value => {
              this.photo = value;
            });

            // console.log(this.currentUser)
            this.storageService.saveUser(this.currentUser);


            Swal.fire({
              icon: 'success',
              text: "Modification reçu",
              // showConfirmButton: true,
              timer: 2000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            })
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






  ngOnInit() {
    this.currentUser = this.storageService.getUser();
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

}
