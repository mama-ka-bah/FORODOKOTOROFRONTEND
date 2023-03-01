import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChargementService } from '../services/chargement.service';
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
  reponseReservation:any
  reservations:any
  reponseAccept: any;
  reponseRejet: any;
  reponseMettreFin:any;
  vide:boolean = true;
  Raccepter:any;
  Rrejeter:any;
  RenAttente:any;
  Rterminer:any;
  Rencours:any;


  constructor(
    private storageService : StorageService,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private userService: AuthentificationService,
    private agriculteurService: AgriculteurService,
    private chargementService: ChargementService

    ) { }


    ionViewWillEnter(){
      this.donneesService.photoProfil.next(this.currentUser.photo);
     this.donneesService.photoProfil$.subscribe(value => {
       this.photo = value;
     });
    }
    
  /* de but du ts de drop down */
  @ViewChild('listenerOut', { static: true }) listenerOut!: ElementRef;
  private values: string[] = ['first', 'second', 'third'];

  accordionGroupChange = (ev: any) => {
    const nativeEl = this.listenerOut.nativeElement;
    if (!nativeEl) {
      return;
    }

    const collapsedItems = this.values.filter((value) => value !== ev.detail.value);
    const selectedValue = ev.detail.value;

    nativeEl.innerText = `
      Expanded: ${selectedValue === undefined ? 'None' : ev.detail.value}
      Collapsed: ${collapsedItems.join(', ')}
    `;
  };
    /* fin ts de drop down */



       //l'objet form froup lié à mon formulaire dans le template
   myForm = new FormGroup({ 
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
});

get fProfil() {
  return this.myForm.controls;
}

recupererLesReservationEncoursDunTransporteur(){
  this.agriculteurService.recupererReservationEncours(this.currentUser.id).subscribe(data =>{
    this.reservations = data;
    console.log(this.reservations)
    for(let i= 0; i<this.reservations.length; i++){
      if(this.reservations[i].status === "ENCOURS" || (this.reservations[i].status === "ACCEPTER")){
        this.vide = false;
        // alert("allo")
      }
    }
  })
}

recupererLesReservationsAccepter(){
  this.agriculteurService.lesReservationAccepter(this.currentUser.id).subscribe(data =>{
    this.Raccepter = data;
  })
}

recupererLesReservationsEnAttente(){
  this.agriculteurService.lesReservationEnAttente(this.currentUser.id).subscribe(data =>{
    this.RenAttente = data;
  })
}

recupererLesReservationsRejeter(){
  this.agriculteurService.lesReservationRejeter(this.currentUser.id).subscribe(data =>{
    this.Rrejeter = data;
  })
}

recupererLesReservationsTerminer(){
  this.agriculteurService.lesReservationTerminer(this.currentUser.id).subscribe(data =>{
    this.Rterminer = data;
  })
}

recupererLesReservationsEncours(){
  this.agriculteurService.lesReservationEncours(this.currentUser.id).subscribe(data =>{
    this.Rencours = data;
  })
}

accepterReservation(reservationId:any){
  Swal.fire({
    text: 'Êtes vous sûr d\'accepter cette reservation',
    showDenyButton: true,
    confirmButtonText: 'Accepter',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    if (result.isConfirmed) {  

      this.chargementService.presentLoading();  

      this.agriculteurService.accepterReservation(reservationId).subscribe(data =>{
      this.reponseAccept=  data;
      this.recupererLesReservationEncoursDunTransporteur();
      this.recupererLesReservationsAccepter();
      this.recupererLesReservationsEnAttente();
      this.recupererLesReservationsRejeter();
      this.recupererLesReservationsEncours();
      this.recupererLesReservationsTerminer();

      this.chargementService.dismissLoading();
        
        ///si l'ajout du champ a marché
        if(this.reponseAccept.status == 1 ){

          Swal.fire({
            icon: 'success',
            text: "Reservation acceptée",
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

rejeterReservation(reservationId:any){
  Swal.fire({
    text: 'Êtes vous sûr de rejeter cette rervation',
    showDenyButton: true,
    confirmButtonText: 'Rejeter',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    if (result.isConfirmed) {       
      this.chargementService.presentLoading();    
      this.agriculteurService.rejeterReservation(reservationId).subscribe(data =>{
      this.reponseRejet =  data;
      this.recupererLesReservationEncoursDunTransporteur();
      this.recupererLesReservationsAccepter();
      this.recupererLesReservationsEnAttente();
      this.recupererLesReservationsRejeter();
      this.recupererLesReservationsEncours();
      this.recupererLesReservationsTerminer();

      this.chargementService.dismissLoading();
        
        ///si l'ajout du champ a marché
        if(this.reponseRejet.status == 1 ){

          Swal.fire({
            icon: 'success',
            text: "Reservation rejetée",
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


mettreFinReservation(reservationId:any){
  Swal.fire({
    text: 'Êtes vous sûr de marquer cette rervation comme terminer',
    showDenyButton: true,
    confirmButtonText: 'Terminer',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    if (result.isConfirmed) {  
      this.chargementService.presentLoading();       
      this.agriculteurService.mettrefinReservation(reservationId, this.currentUser.id, ).subscribe(data =>{
      this.reponseMettreFin = data;

      this.recupererLesReservationEncoursDunTransporteur();
      this.recupererLesReservationsAccepter();
      this.recupererLesReservationsEnAttente();
      this.recupererLesReservationsRejeter();
      this.recupererLesReservationsEncours();
      this.recupererLesReservationsTerminer();

      this.chargementService.dismissLoading();
        
        ///si l'ajout du champ a marché
        if(this.reponseMettreFin.status == 1 ){
          // console.log(this.currentUser)

          Swal.fire({
            icon: 'success',
            text: "Reservation Terminée",
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
    this.recupererLesReservationEncoursDunTransporteur();
    this.recupererLesReservationsAccepter();
    this.recupererLesReservationsEnAttente();
    this.recupererLesReservationsRejeter();
    this.recupererLesReservationsEncours();
    this.recupererLesReservationsTerminer();
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
