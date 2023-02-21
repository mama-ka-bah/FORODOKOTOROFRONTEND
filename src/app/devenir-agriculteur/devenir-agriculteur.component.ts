import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-devenir-agriculteur',
  templateUrl: './devenir-agriculteur.component.html',
  styleUrls: ['./devenir-agriculteur.component.scss'],
})
export class DevenirAgriculteurComponent implements OnInit {

  currentUser:any;

  constructor(
    public popoverController: PopoverController,
    private storageService: StorageService
    ) { }

  ngOnInit() {
    
    this.currentUser = this.storageService.getUser();
   
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  closePopover() {
    // let data = { etat: false};
    // this.popoverController.dismiss(data);
    this.popoverController.dismiss();

  }

 
  
  envoyer() {

    if(this.currentUser.photo != null){

      let data = { etat: true};
    this.popoverController.dismiss(data);

    }else {
            Swal.fire({
              icon: 'info',
              text: 'Veuiilez d\'abord ajouter une photo de profil',
              showConfirmButton: true,
              // timer: 2000,
              heightAuto:false,
            })
        }
  }

}
