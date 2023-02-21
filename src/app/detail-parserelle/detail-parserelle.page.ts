import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController, IonModal, LoadingController } from '@ionic/angular';
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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChargementService } from '../services/chargement.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-detail-parserelle',
  templateUrl: './detail-parserelle.page.html',
  styleUrls: ['./detail-parserelle.page.scss'],
})
export class DetailParserellePage implements OnInit {

  
  //code lié à mon modal pour gerer sa fermeture debut
  @ViewChild(IonModal) modal!: IonModal;


  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }  //code lié à mon modal pour gerer sa fermeture debut


  tousLesCultivesStockerDansSession:any
  detailDunCutive:any;
  idDeCultiveActuel:any;
  indexCultiveActuel:any//son index dans la session
  lesCultiveREcuperer:any;
  lesPrevisionsDunCultive:any;
  lesPhaseActivesDunecultive:any;
  lesDetailsDunePhases:any;
  resultatReouvertureCultive:any

  //lié à input formulaire
  recolterealise: any;
  myForm:any;

  etatFinission:boolean | undefined

  resultatatMettreFinACultive:any;

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
    public loadingController: LoadingController
    // private cultureParserelle: CultureParserelleComponent
  ) { 
    this. recupererdetailDunCultive();
  //l'objet form group lié à mon formulaire dans le template
 this.myForm = new FormGroup({
    recolterealise: new FormControl(this.recolterealise)
});
  }

  myForm1 = new FormGroup({
    recolte: new FormControl(null,  [Validators.required]),
    dateFinCultive: new FormControl(null, [Validators.required]),
});

submitForm1() {

  if(this.myForm.valid) {
      Swal.fire({
        text: 'Etes vous sur d\'ajouter cette parserelle',
        // showDenyButton: true,
        confirmButtonText: 'Envoyer',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) {  

         this.dismissLoading()
    this.champService.mettrefinAunCultive(this.detailDunCutive.id, this.myForm1.controls.dateFinCultive.value, this.myForm1.controls.recolte.value).subscribe(data => {
      this.resultatatMettreFinACultive = data;
  
            ///si l'ajout la mise a marché
            if(this.resultatatMettreFinACultive.status == 1){
              this.dismiss();
              
              this.myForm.reset();
             
              this.mettreAjourLesDonnees();
              this.etatFinission = true;

              this.dismissLoading();
            
              Swal.fire({
                icon: 'success',
                text: this.resultatatMettreFinACultive.message,
                showConfirmButton: true,
                customClass: {
                  container: 'small-text'
                },
                heightAuto:false,
              })
              this.ngOnInit();
            }else{
              Swal.fire({
                icon: 'info',
                text: this.resultatatMettreFinACultive.message,
                showConfirmButton: true,
                heightAuto:false,
              })
            }
            
          })
        } 
      })
    
  }

}

mettreAjourLesDonnees(){
  this.indexCultiveActuel = this.routes.snapshot.params['id'];
  const lesCultivesstockerDansSessions = this.storageService.getCultive();

  this.detailDunCutive = lesCultivesstockerDansSessions[this.indexCultiveActuel];

  this.champService.recupererCultiveParSonId(this.detailDunCutive.id).subscribe(data => {
    this.detailDunCutive = data;
  })

  //ici je recupere l'id du cultive
  this.idDeCultiveActuel = this.detailDunCutive.id;
  this.recolterealise = this.detailDunCutive.recolterealis
}

signalerUnCultiveCommeNonTerminer(){


  Swal.fire({
    text: 'Etes vous sûr d\'activer cette culture',
    // showDenyButton: true,
    confirmButtonText: 'Envoyer',
    denyButtonText: `Annuler`,
    heightAuto:false,
    position:'center'
  }).then((result) => {
    if (result.isConfirmed) {  


      this.chargementServie.presentLoading();
      this.champService.signalercultivecommenonterminer(this.idDeCultiveActuel).subscribe(data =>{

        this.resultatReouvertureCultive = data;

        ///si l'ajout la mise a marché
        if(this.resultatReouvertureCultive.status == 1){

          setTimeout(() => {

            this.etatFinission = false;

            this.mettreAjourLesDonnees();
          
          this.chargementServie.dismissLoading();

          }, 1000);
                 
          Swal.fire({
            icon: 'success',
            text: this.resultatReouvertureCultive.message,
            showConfirmButton: true,
            customClass: {
              container: 'small-text'
            },
            heightAuto:false,
          })
          this.ngOnInit();
        }else{
          Swal.fire({
            icon: 'info',
            text: this.resultatReouvertureCultive.message,
            showConfirmButton: true,
            heightAuto:false,
          })
        }
        
      })
    } 
  })
}

  ngOnInit() {
    this. recupererdetailDunCultive();
    this.recupererPrevissionsDunCultive(this.idDeCultiveActuel);
    this.recupererPhaseActivesDunecultive(this.idDeCultiveActuel);
  }

  ionViewWillEnter(){
    this.mettreAjourLesDonnees();
  }




  //cette fonction est utiliser pour afficher les details liée à un cultive donné
  recupererdetailDunCultive(){
    this.indexCultiveActuel = this.routes.snapshot.params['id'];
    const lesCultivesstockerDansSessions = this.storageService.getCultive();

    this.detailDunCutive = lesCultivesstockerDansSessions[this.indexCultiveActuel];

    //ici je recupere l'id du cultive
    this.idDeCultiveActuel = this.detailDunCutive.id;
    this.recolterealise = this.detailDunCutive.recolterealise;

    if(this.detailDunCutive.status == "TERMINER"){
      this.etatFinission = true;
    }else{
      this.etatFinission == false;
    }

  }



 //La fonction appeler lors de l'envoie de mon formulaire
 submitForm() {

  //verifie si le formulaire est valide
  if(this.myForm.valid) {
    this.presentLoading()

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
    this.dismissLoading();
}


  //ici on recupere les differentes prevision lié à un cultive
  recupererPrevissionsDunCultive(recupererPrevissionsDunCultive:any){
    this.champService.recupererPrevisionDunCultive(this.idDeCultiveActuel).subscribe(data =>{
      this.lesPrevisionsDunCultive = data;
      // console.log(this.lesPrevisionsDunCultive);
    })
  }

  //à rendre claire
  recupererDetailDuneParserelle(){
    this.tousLesCultivesStockerDansSession = this.storageService.getCultive();
   this.champService.recupererLesCultiveDuneParsererelle(this.tousLesCultivesStockerDansSession[0].parserelle.id).subscribe(data =>{
    
    this.storageService.saveCultive(data);
    
    this.tousLesCultivesStockerDansSession = this.storageService.getCultive();
    //this.navCtrl.pop();
    this.voirListeCultiveDuneParserelle(this.tousLesCultivesStockerDansSession[0].parserelle, this.tousLesCultivesStockerDansSession[0].parserelle.id);
    //alert(this.tousLesCultivesStockerDansSession[0].parserelle.status)
    this.mettreAjourLesDonnees();
   })
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
      //  console.log(JSON.stringify(result));
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




    
  
  //loading controlleur utilise pour montrer à l'user que le programme est en cours de chargement
 async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Patienter...',
    duration: 3000
  });
  await loading.present();

  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed!');
}

async dismissLoading() {
  await this.loadingController.dismiss();
}


}


