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
  
  tousLesChampDunUserActuel:any
  tmp:any //temperature recurer
  temperatureActuelChamp:any
  lesParserelleDunChamp:any
  detailDuneParserelle:any
  tousLesParserelleStockerDansSession:any
  idParserelleActive:any;
  lesCultivesActivesDuneParserelle:any;
  indexChampActuel:any;

  existeParserelle:boolean | undefined

  //
    //les details de mon champ debut
  //
  detailsChamp = {
    id: 0,
    nom :"",
    longueur:0,
    largeur:0,
    longitude:0,
    latitude:0,
    adresse:"",
    nombreParserelle:0,
    photo:"",
    proprietaire:null
  }

  perimetre:any = 0;
  surface:any = 0;
  loadingController: any;
  

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
    //id du champ actuel
    this.idChampActuel = this.routes.snapshot.params['id'];
   
    // this.tousLesChampDunUserActuel = this.storageService.getChamps();
    // this.detailsChamp = this.tousLesChampDunUserActuel[this.indexChampActuel];

    this.champService.recupererChampParId(this.idChampActuel).subscribe((data)=>{
      this.detailsChamp =  data; 
      this.detailsChamp = this.detailsChamp;

      console.log("valeur data : " + data.nom);

      this.perimetre= (this.detailsChamp.largeur + this.detailsChamp.longueur)*2;
      this.surface = this.detailsChamp.largeur * this.detailsChamp.longueur;
      
    });

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
      
      if(data.length > 0){
        this.storageService.saveParserelle(this.lesParserelleDunChamp);
        this.existeParserelle = true;
      }else{
        this.existeParserelle = false;
      }

    })
  }



  recupererDetailDuneParserelle(index:any, idParserelleCliquer:any){
    this.idParserelleActive = idParserelleCliquer;
    this.tousLesParserelleStockerDansSession = this.storageService.getParserelle();
    // alert("parserelle cliqué" + this.idParserelleActive);
    this.detailDuneParserelle = this.tousLesParserelleStockerDansSession[index];
    // console.log("me voilà: eeeeeeeeeeeeeeeeeeeee " + this.detailDuneParserelle);
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
