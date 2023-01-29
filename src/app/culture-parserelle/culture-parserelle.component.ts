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

  detailParserelleClique:any
  idparserelleEnvoyer:any;
  lesCultivesActivesDuneParserelle:any;
  lesCultivesStockerDansSession:any;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
    
  ) {
     //ici je recuperere ces données dans mondata  
     this.detailParserelleClique = this.navParams.get('data');
     this.idparserelleEnvoyer = this.navParams.get('data1');
     console.log("Parserelle envoyer: " + this.detailParserelleClique);
     console.log("Cultives envoyer: " +JSON.stringify(this.idparserelleEnvoyer));
   }


   
  recupererlesCultiveActiveDuneParserelle(){
    this.champService.recupererLesCultiveDuneParsererelle(this.idparserelleEnvoyer).subscribe(data =>{
      this.lesCultivesActivesDuneParserelle = data;
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx: " + this.lesCultivesActivesDuneParserelle)
    })
  }

  voirDetailDuneCultive(idCultive:any){
    // this.idParserelleActive = idParserelleCliquer;
    // this.tousLesParserelleStockerDansSession = this.storageService.getParserelle();
    // this.detailDuneParserelle = this.tousLesParserelleStockerDansSession[idParserelleCliquer-1];
    console.log("hello");
    this.modalCtrl.dismiss();
   this.router.navigate(["/detail-parserelle"]);

  }

  ngOnInit() {
    this.recupererlesCultiveActiveDuneParserelle();
  }

    //cette fonction permet de fermer le modal
    async closeModal() {
      await this.modalCtrl.dismiss();
     }




}
