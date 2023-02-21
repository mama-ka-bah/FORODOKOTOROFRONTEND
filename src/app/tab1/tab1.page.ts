import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { Router } from '@angular/router';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ChoisirProfilComponent } from '../choisir-profil/choisir-profil.component';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { DevenirTransporteurComponent } from '../devenir-transporteur/devenir-transporteur.component';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  tmp:any;
  tmp5jours:any;
  degre:any;
  ville:any;
  icon:any;
  tmp_max :any;
  tmp_min:any;

  tmp_temporaire1:any;
  tmp_temporaire2:any;
  tmp_temporaire3:any;
  lesProduitsAgricoles:any;

  //utilisateur actuel
  currentUser:any;

  constructor(
    private meteoservice : MeteoService,
    private storageService : StorageService,
    private router : Router,
    public donneesService: DonneesStockerService,
    public loadingController: LoadingController,
    private produitService: ProduitAgricolesService
    ) { 
      this.presentLoading();
     }

    ionViewDidEnter(){
      this.donneesService.showMenu.next(true);
    }
 
  ngOnInit(): void {
      this.getCurrentLocation();

    this.recupererTousLesproduitsAgricole();
    
    this.currentUser = this.storageService.getUser();
    this.donneesService.setpageActuel("FORODOKOTORO");

    const currentUrl = this.router.url;
    this.storageService.saveCurrentUrl(currentUrl);
  }


  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
  // console.log("latitude: "+ coordinates.coords.latitude + "Longitude:"+ coordinates.coords.longitude);
  this.meteoservice.getWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((data) =>{
    
    this.tmp =  data;

    this.degre = Math.round(this.tmp.main.temp - 273.15);
    
    this.tmp_max = Math.round(this.tmp.main.temp_max - 273.15);
    this.tmp_min = Math.round(this.tmp.main.temp_min - 273.15);

    this.ville = this.tmp.name;
    const index = this.ville.indexOf(' ');
    this.ville = this.ville.substring(0, index);
    this.icon = this.tmp.weather[0].icon;
    // console.log(data);
  })

  this.meteoservice.pregetWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(data =>{
    
    this.tmp5jours =  data;
    // console.log("temmmmmmp5jours: " + this.tmp5jours);
    this.tmp_temporaire1 =  Math.round(this.tmp5jours["list"][0]["main"]["temp_max"] - 273.15);
    this.tmp_temporaire2 = Math.round(this.tmp5jours["list"][1]["main"]["temp_max"] - 273.15);
    this.tmp_temporaire3 = Math.round(this.tmp5jours["list"][2]["main"]["temp_max"] - 273.15);

    this.tmp_max = Math.max(this.tmp_temporaire1, this.tmp_temporaire2, this.tmp_temporaire3);
    this.tmp_min  = Math.min(this.tmp_temporaire1, this.tmp_temporaire2, this.tmp_temporaire3);


    // console.log("temp1: " + this.tmp_temporaire1 + "temp1: " + this.tmp_temporaire2 + "temp1: " + this.tmp_temporaire3);
  })
  
  };

//ici on recupere tous les produits agricole depuis la base donn"e nom de la fonction service à corriger
  recupererTousLesproduitsAgricole(){
    this.produitService.recupererParsererelleDunChamp().subscribe(data =>{
      this.lesProduitsAgricoles = data;
    })
  }


  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    loop:true,
    spaceBetween:10,
    autoplay:true
  }

  //deconnexion
  deconnexion(){
    this.storageService.clean();
    this.router.navigateByUrl("/connexion");
  }

  reloadPage(): void {
    window.location.reload();
  }




  
 //loading controlleur
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
