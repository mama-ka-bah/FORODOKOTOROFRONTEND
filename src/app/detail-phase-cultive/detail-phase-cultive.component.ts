import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-detail-phase-cultive',
  templateUrl: './detail-phase-cultive.component.html',
  styleUrls: ['./detail-phase-cultive.component.scss'],
})
export class DetailPhaseCultiveComponent implements OnInit {

  detailsPhaseAAficher:any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
    
  ) {
     //ici je recuperere ces données dans mondata  
     this.detailsPhaseAAficher = this.navParams.get('data');
     console.log("phases envoyer: " + this.detailsPhaseAAficher);
     console.log("phases envoyer: " +JSON.stringify(this.detailsPhaseAAficher));
   }

   
    //cette fonction permet de fermer le modal
    async closeModal() {
      await this.modalCtrl.dismiss();
     }


  ngOnInit() {}

}
