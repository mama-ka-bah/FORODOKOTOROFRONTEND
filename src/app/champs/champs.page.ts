import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController, IonRefresher } from '@ionic/angular';
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
  // @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;

  // refreshPage() {
  //   this.refresher.complete();
  // }

  // doRefresh(event:any) {
  //   console.log('Begin async operation');
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     event.target.complete();
  //   }, 2000);
  // }

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
   // alert("je suis actualiser par init")
   this.recuperChampDunAgriculteur();
  }

  ionViewDidEnter(){
   // alert("je suis actualiser par did")
  }

  ionViewWillEnter(){
    //alert("je suis actualiser par will")
    this.recuperChampDunAgriculteur();
  }

  recuperChampDunAgriculteur(){
    this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data =>{
      //on met les donnee du champ de l'user actuel dns le stockage
      this.donneesService.lesChampsDeLuserActuel.next(data);
      
      //on souscrit à cette observable pour youjours recuperer les données à temps réelle
      this.donneesService.lesChampsDeLuserActuel$.subscribe(value => {
        this.champUserActuel = value;
      });
     
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
function IonicPage() {
  throw new Error('Function not implemented.');
}

