import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController, IonModal } from '@ionic/angular';
import { AjouterPhaseCultiveComponent } from '../ajouter-phase-cultive/ajouter-phase-cultive.component';
import { CultureParserelleComponent } from '../culture-parserelle/culture-parserelle.component';
import { DetailsChampsPage } from '../details-champs/details-champs.page';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { DetailPhaseCultiveComponent } from '../detail-phase-cultive/detail-phase-cultive.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ChargementService } from '../services/chargement.service';



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
  lesPhaseActivesDunecultive:any;
  lesDetailsDunePhases:any;

  //lié à input formulaire
  recolterealise: any;
  myForm:any

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
    private meteoservice: MeteoService,
    private chargementServie: ChargementService,
    // private cultureParserelle: CultureParserelleComponent
  ) { 
    this. recupererdetailDunCultive();
  //l'objet form group lié à mon formulaire dans le template
 this.myForm = new FormGroup({
    recolterealise: new FormControl(this.recolterealise)
});
  }

  ngOnInit() {
    this. recupererdetailDunCultive();
    this.recupererPrevissionsDunCultive(this.idDeCultiveActuel);
    this.recupererPhaseActivesDunecultive(this.idDeCultiveActuel);
  }

  //cette fonction est utiliser pour afficher les details liée à un cultive donné
  recupererdetailDunCultive(){
    this.indexCultiveActuel = this.routes.snapshot.params['id'];
    const lesCultivesstockerDansSessions = this.storageService.getCultive();
    this.detailDunCutive = lesCultivesstockerDansSessions[this.indexCultiveActuel];

    //ici je recupere l'id du cultive
    this.idDeCultiveActuel = this.detailDunCutive.id;
    this.recolterealise = this.detailDunCutive.recolterealise;
  }



 //La fonction appeler lors de l'envoie de mon formulaire
 submitForm() {

  //verifie si le formulaire est valide
  if(this.myForm.valid) {
    this.chargementServie.presentLoading();

    this.champService.mettreAjourQuantiteReelleDeRecolte(this.detailDunCutive.id, this.myForm.controls.recolterealise.value).subscribe(data =>{
      // this.chargementServie.dismissLoading();
    })
//this.cultureParserelle.recupererlesCultiveActiveDuneParserelle();
this.champService.recupererLesCultiveDuneParsererelle(this.detailDunCutive.parserelle.id).subscribe( data =>{  this.storageService.saveCultive(data);
  
});
const lesCultivesstockerDansSessions = this.storageService.getCultive();
    this.detailDunCutive = lesCultivesstockerDansSessions[this.indexCultiveActuel];
    this.recolterealise = this.detailDunCutive.recolterealise;
  this.ngOnInit();

  }
}


  //ici on recupere les differentes prevision lié à un cultive
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


  recupererPhaseActivesDunecultive(idDeCultiveActuel: any){
    this.champService.recupererPhaseActivesDunecultive(idDeCultiveActuel).subscribe(data => {
      this.lesPhaseActivesDunecultive = data;

      if(this.lesPhaseActivesDunecultive)
      this.storageService.savePhases(this.lesPhaseActivesDunecultive);
    })
  }

  
  //permet de recuperer les details parmi les les phases de la cultives actuelle dans dans la sessionStorage
  recupererLesDetailDunePhases(indexPhases:any){
    const toutesLesPhasesStockerDansSession =  this.storageService.getPhases();
    this.lesDetailsDunePhases = toutesLesPhasesStockerDansSession[indexPhases];
    this.detailAction(this.lesDetailsDunePhases)
   
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
    /* fin ts de drop down */


//on fait appel au composant pout ajouter une nouvelle ction
    async modalAjoutAction() {
      const modal = await this.modalCtrl.create({
        //le composant contenant le modal
        component: AjouterPhaseCultiveComponent,
        //Ici on envoi l'id de cultive actuel au composant contenant le formulaire de creation de 
        componentProps: {
        data: this.idDeCultiveActuel
    }
      });

      //Cette methode contient les 
      modal.onDidDismiss().then((result) => {
       console.log(JSON.stringify(result));
       this.ngOnInit();
      });
      await modal.present();
    }



    //on fait appel au composant pour afficher lees details d'une action (ou phase de cultive)
    async detailAction(detailAAfficher:any) {
      const modal = await this.modalCtrl.create({
        //le composant contenant le modal
        component: DetailPhaseCultiveComponent,

        //Ici on envoi les details de la phase (action) à afficher au composant pour les afficher
        componentProps: {
        data: detailAAfficher
    }
      });

      //Cette methode contient les 
      modal.onDidDismiss().then(() => {
      });
      await modal.present();
    }


}


