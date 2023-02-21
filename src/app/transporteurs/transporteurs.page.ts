import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number';
import { AuthentificationService } from '../services/authentification.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transporteurs',
  templateUrl: './transporteurs.page.html',
  styleUrls: ['./transporteurs.page.scss'],
})
export class TransporteursPage implements OnInit {
  tousLestransporteurs:any

  constructor(
    private donneesService: DonneesStockerService,
    private storageService : StorageService,
    private router : Router,
    private userService: AuthentificationService,
    private callNumber: CallNumber
    ) { 
      const currentUrl = this.router.url;
      const pageName = currentUrl.split('/')[1];
  
      storageService.saveCurrentUrl(currentUrl);
    }

      //pour la pagination et la recherche
  p: number = 1;
  searchTerm:any;  
  filterTerm:any;


    async appelle(phoneNumber: string) {

      Swal.fire({
        text: 'Vous êtes sur le point d\'appeler ce transporteur',
        showDenyButton: true,
        confirmButtonText: 'Appeler',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) {                      
              this.callNumber.callNumber(phoneNumber, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));            
            }
            
          })                
    }

    ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
      this.recupererTousLesTransporteurs();
    }

  ngOnInit() {
    this.donneesService.showMenu.next(true);
    this.donneesService.setpageActuel("Transporteurs");
    this.recupererTousLesTransporteurs();
  }


  recupererTousLesTransporteurs(){
    this.userService.recupererTousLesTransporteur().subscribe(data =>{
      this.tousLestransporteurs = data;
      // console.log(this.tousLestransporteurs)
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
