import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-culture-parserelle',
  templateUrl: './culture-parserelle.component.html',
  styleUrls: ['./culture-parserelle.component.scss'],
})
export class CultureParserelleComponent implements OnInit {

  mondata:any

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
  ) {
     //ici je recuperere ces données dans mondata  
     this.mondata = this.navParams.get('data');
     console.log(this.mondata);
   }

  ngOnInit() {}

    //cette fonction permet de fermer le modal
    async closeModal() {
      await this.modalCtrl.dismiss();
     }

}
