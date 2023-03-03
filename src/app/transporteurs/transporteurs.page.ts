import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number';
import { AuthentificationService } from '../services/authentification.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import Swal from 'sweetalert2';
import { PhoneCall } from "capacitor-plugin-phone-call";
import { AgriculteurService } from '../services/agriculteur.service';
import { ChargementService } from '../services/chargement.service';

@Component({
  selector: 'app-transporteurs',
  templateUrl: './transporteurs.page.html',
  styleUrls: ['./transporteurs.page.scss'],
})
export class TransporteursPage implements OnInit {
  tousLestransporteurs:any;
  currentUser:any;
  reponsecontact:any;
  reponseAnnule:any;
  listeReservationsTransporteur: any[] = [];
  reservations:any;

  constructor(
    private donneesService: DonneesStockerService,
    private storageService : StorageService,
    private router : Router,
    private userService: AuthentificationService,
    private callNumber: CallNumber,
    private transporteurService: AgriculteurService,
    private chargementChervice: ChargementService,
    private agriculteurService: AgriculteurService,
    private changeDetectorRef: ChangeDetectorRef,
    ) { 
      const currentUrl = this.router.url;
      const pageName = currentUrl.split('/')[1];
      storageService.saveCurrentUrl(currentUrl);
    }


  //pour la pagination et la recherche
  p: number = 1;
  searchTerm:any;  
  filterTerm:any;


    async appelle(phoneNumber: string, idTrans:any) {

      Swal.fire({
        text: 'Vous êtes sur le point de reserver ce transporteur',
        showDenyButton: true,
        confirmButtonText: 'Reserver',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) {    
          this.contacterTransporteur(idTrans);                  
          //     this.callNumber.callNumber(phoneNumber, true)
          // .then(res => console.log('Launched dialer!', res))
          // .catch(err => console.log('Error launching dialer', err));    
          // PhoneCall.start({ phone:  phoneNumber});  
          if(this.reponsecontact.status == 1)      {
            Swal.fire({
              icon: 'success',
              text: "Reservation éffectuée",
              showConfirmButton: true,
              // timer: 3000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            })
          }
            }
            
          })                
    }


    contacterTransporteur(idTrans:any){

      Swal.fire({
        text: 'Vous êtes sur le point de reserver ce transporteur',
        showDenyButton: true,
        confirmButtonText: 'Reserver',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) { 

          this.chargementChervice.presentLoading();
      this.transporteurService.contacterTransporteur(idTrans, this.currentUser.id).subscribe(data =>{
        this.reponsecontact =  data;
        this.recupererTousLesTransporteurs();


        this.chargementChervice.dismissLoading();
        
        if(this.reponsecontact.status == 1){
          Swal.fire({
            icon: 'success',
            text: "Reservation éffectuée",
            showConfirmButton: true,
            // timer: 3000,
            customClass: {
              container: 'small-text'
            },
            heightAuto:false,
          })
        }
      })
        }
      })

    }


    annulerReservation(transporteurId:any){

      Swal.fire({
        text: 'Vous êtes sur d\'annuler cette reservation',
        showDenyButton: true,
        confirmButtonText: 'Valider',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) { 

        this.chargementChervice.presentLoading();
        this.transporteurService.supprimerReservation(transporteurId).subscribe(data =>{
        this.reponseAnnule =  data;
        
        this.chargementChervice.dismissLoading();
        
        if(this.reponsecontact.status == 1){
          Swal.fire({
            icon: 'success',
            text: "Reservation annulée",
            showConfirmButton: true,
            // timer: 3000,
            customClass: {
              container: 'small-text'
            },
            heightAuto:false,
          })
          
            this.userService.recupererTousLesTransporteur().subscribe(data =>{
              this.tousLestransporteurs = data;
             
                for(let i = 0; i<this.tousLestransporteurs.length; i++){
                  this.agriculteurService.recupererLaListeDereservations(this.tousLestransporteurs[i]?.id).subscribe(data =>{
                    const listeReservations = data;
                    for(let y = 0; y<listeReservations.length; y++){
                      alert(listeReservations[y].transporteur.nomcomplet + " " + listeReservations[y].status);
                      this.listeReservationsTransporteur.push(listeReservations[y]);
                    }
                  })
              }

            });

            this.reloadPage();
        }else{
          Swal.fire({
            icon: 'info',
            text: "Echec",
            showConfirmButton: true,
            // timer: 3000,
            customClass: {
              container: 'small-text'
            },
            heightAuto:false,
          })
        }
      })

        }
      })

    }



    ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
      this.recupererTousLesTransporteurs();
    }

    ionViewWillEnter(){
      this.recupererTousLesTransporteurs();
    }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Transporteurs");
    this.recupererTousLesTransporteurs();
  }

  recupererLesReservationsDunTransporteur(transId:any):any{
    this.agriculteurService.recupererReservationEncours(transId).subscribe(data =>{
      this.reservations = data;
    })
    return this.reservations.length;
  }

recupererToutesLesReservationsUaUn(){
  for(let i = 0; i<this.tousLestransporteurs.length; i++){
    this.agriculteurService.recupererLaListeDereservations(this.tousLestransporteurs[i]?.id).subscribe(data =>{
      const listeReservations = data;
      for(let y = 0; y<listeReservations.length; y++){
        this.listeReservationsTransporteur.push(listeReservations[y]);
      }
    })
  }

}
  recupererTousLesTransporteurs(){
    this.userService.recupererTousLesTransporteur().subscribe(data =>{
      this.tousLestransporteurs = data;
      this.recupererToutesLesReservationsUaUn();
    })
  }

  recherchereservationDunUser(transporteurId:any):boolean{
    for(let i = 0; i<this.listeReservationsTransporteur.length; i++){
      // console.log(JSON.stringify(this.listeReservationsTransporteur[i]))
      if(this.listeReservationsTransporteur[i].reserveur.id === this.currentUser.id && this.listeReservationsTransporteur[i].transporteur.id === transporteurId  && (this.listeReservationsTransporteur[i].status === "ENCOURS" || this.listeReservationsTransporteur[i].status === "ENATTENTE")){
        return true;
      }
    }
    return false;
  }

  reloadPage(): void {
    window.location.reload();
  }

}
