import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { CultureParserelleComponent } from '../culture-parserelle/culture-parserelle.component';
import { DetailsChampsPage } from '../details-champs/details-champs.page';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-detail-parserelle',
  templateUrl: './detail-parserelle.page.html',
  styleUrls: ['./detail-parserelle.page.scss'],
})
export class DetailParserellePage implements OnInit {

  tousLesCultivesStockerDansSession:any

  constructor(
    private routes : ActivatedRoute,
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private meteoservice: MeteoService
  ) { }

  ngOnInit() {
  }


  
  recupererDetailDuneParserelle(){
    this.tousLesCultivesStockerDansSession = this.storageService.getCultive();
   this.voirListeCultiveDuneParserelle(this.tousLesCultivesStockerDansSession[0].parserelle, this.tousLesCultivesStockerDansSession[0].parserelle.id);

  }


   //modal permettant d'ajouter une parserelle de champ
   async voirListeCultiveDuneParserelle(detailParserelleClique:any, idParserelleCliquer:any) {
    const modal = await this.modalCtrl.create({
      component: CultureParserelleComponent,
      componentProps: {
      data: detailParserelleClique,
      data1: idParserelleCliquer
  }
    });

    await modal.present();

  }
}
