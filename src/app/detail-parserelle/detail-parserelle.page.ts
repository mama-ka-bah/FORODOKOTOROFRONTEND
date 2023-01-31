import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  detailDunCutive:any;
  idDeCultiveActuel:any;
  indexCultiveActuel:any//son index dans la session
  lesCultiveREcuperer:any;
  lesPrevisionsDunCultive:any;

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
    this. recupererdetailDunCultive();
    this.recupererPrevissionsDunCultive(this.idDeCultiveActuel);
  }

  //cette fonction est utiliser pour afficher les details liée à un cultive donné
  recupererdetailDunCultive(){
    this.indexCultiveActuel = this.routes.snapshot.params['id'];
    const lesCultivesstockerDansSessions = this.storageService.getCultive();
    this.detailDunCutive = lesCultivesstockerDansSessions[this.indexCultiveActuel];

    //ici je recupere l'id du cultive
    this.idDeCultiveActuel = this.detailDunCutive.id;
  }

  recupererPrevissionsDunCultive(recupererPrevissionsDunCultive:any){
    this.champService.recupererPrevisionDunCultive(this.idDeCultiveActuel).subscribe(data =>{
      this.lesPrevisionsDunCultive = data;
      console.log(this.lesPrevisionsDunCultive);
    })
  }

  //à rendre claire
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
    /* de but du ts de drop down */


}
