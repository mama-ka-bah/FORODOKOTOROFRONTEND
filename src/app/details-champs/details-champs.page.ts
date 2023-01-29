import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { CultureParserelleComponent } from '../culture-parserelle/culture-parserelle.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-details-champs',
  templateUrl: './details-champs.page.html',
  styleUrls: ['./details-champs.page.scss'],
})
export class DetailsChampsPage implements OnInit {

  myData = {
    name: 'keita',
    age: 23,
    address: {
        city: 'Badinko'
    },
    hobbies: ['meditation', 'musique', 'voyage']
};



reponseAjoutChamp:any
currentUser:any


  idChampActuel:any
  detailsChamp:any;
  tousLesChampDunUserActuel:any
  tmp:any //temperature recurer
  temperatureActuelChamp:any
  lesParserelleDunChamp:any
  detailDuneParserelle:any
  tousLesParserelleStockerDansSession:any
  idParserelleActive:any;
  lesCultivesActivesDuneParserelle:any;


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
    this.recupererDetailChamp();
    this.recupererParserelleDunChamp();
  }

  recupererDetailChamp(){
    this.idChampActuel = this.routes.snapshot.params['id'];
    this.tousLesChampDunUserActuel = this.storageService.getChamps();
    this.detailsChamp = this.tousLesChampDunUserActuel[this.idChampActuel-1];
    this.recupererTemperatureChamp(this.detailsChamp.latitude, this.detailsChamp.longitude);
    console.log(this.detailsChamp);
  }


  recupererTemperatureChamp(latitude:any, longitude:any){

    this.meteoservice.getWeather(latitude, longitude).subscribe((data) =>{
    
      this.tmp =  data;
  
      this.temperatureActuelChamp = Math.round(this.tmp.main.temp - 273.15);//en degre
  
    })

  }


  recupererParserelleDunChamp(){

    this.champService.recupererParsererelleDunChamp(this.idChampActuel).subscribe((data) =>{
    
      this.lesParserelleDunChamp =  data;

      if(this.lesParserelleDunChamp != null){
        this.storageService.saveParserelle(this.lesParserelleDunChamp);
      }
  
    })

  }



  recupererDetailDuneParserelle(idParserelleCliquer:any){
    this.idParserelleActive = idParserelleCliquer;
    this.tousLesParserelleStockerDansSession = this.storageService.getParserelle();
    this.detailDuneParserelle = this.tousLesParserelleStockerDansSession[idParserelleCliquer-1];
    //const lesCultives = this.recupererlesCultiveActiveDuneParserelle(idParserelleCliquer)
   this.voirListeCultiveDuneParserelle(this.detailDuneParserelle, idParserelleCliquer);

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

    modal.onDidDismiss().then((resultatAjoutChamp) => {
      //this.router.navigateByUrl('/connexion');
      console.log(resultatAjoutChamp.data);
    });

    await modal.present();
  }
  



}
