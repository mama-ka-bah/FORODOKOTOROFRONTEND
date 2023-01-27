import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.page.html',
  styleUrls: ['./champs.page.scss'],
})
export class ChampsPage implements OnInit {

  currentUser:any;
  champUserActuel:any;
  existe:boolean | undefined

  constructor(
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.recuperChampDunAgriculteur();
  }

  recuperChampDunAgriculteur(){
    this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data =>{
      this.champUserActuel = data;
      // console.log(stringify(this.champUserActuel))
      if(this.champUserActuel == null){
        this.existe=false;
      }else{
        this.existe=true;
        this.storageService.saveChamps(this.champUserActuel);
        
      }
    })
  }


  stockerDetailChamp(index:any){

  }



}
