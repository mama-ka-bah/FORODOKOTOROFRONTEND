import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MeteoService } from '../services/meteo.service';
import { Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../services/stockage.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ChoisirProfilComponent } from '../choisir-profil/choisir-profil.component';




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

  //utilisateur actuel
  currentUser:any;

  constructor(
    private meteoservice : MeteoService,
    private storageService : StorageService,
    private router : Router,
    public popoverController: PopoverController
    ) {}
 
  ngOnInit(): void {
    this.getCurrentLocation();
    this.currentUser = this.storageService.getUser();
  }


  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
  console.log("latitude: "+ coordinates.coords.latitude + "Longitude:"+ coordinates.coords.longitude);
  this.meteoservice.getWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((data) =>{
    
    this.tmp =  data;

    this.degre = Math.round(this.tmp.main.temp - 273.15);
    
    this.tmp_max = Math.round(this.tmp.main.temp_max - 273.15);
    this.tmp_min = Math.round(this.tmp.main.temp_min - 273.15);

    this.ville = this.tmp.name;
    const index = this.ville.indexOf(' ');
    this.ville = this.ville.substring(0, index);
    this.icon = this.tmp.weather[0].icon;
    console.log(data);
  })

  this.meteoservice.pregetWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(data =>{
    
    this.tmp5jours =  data;
    console.log("temmmmmmp5jours: " + this.tmp5jours);
    this.tmp_temporaire1 =  Math.round(this.tmp5jours["list"][0]["main"]["temp_max"] - 273.15);
    this.tmp_temporaire2 = Math.round(this.tmp5jours["list"][1]["main"]["temp_max"] - 273.15);
    this.tmp_temporaire3 = Math.round(this.tmp5jours["list"][2]["main"]["temp_max"] - 273.15);

    this.tmp_max = Math.max(this.tmp_temporaire1, this.tmp_temporaire2, this.tmp_temporaire3);
    this.tmp_min  = Math.min(this.tmp_temporaire1, this.tmp_temporaire2, this.tmp_temporaire3);


    console.log("temp1: " + this.tmp_temporaire1 + "temp1: " + this.tmp_temporaire2 + "temp1: " + this.tmp_temporaire3);
  })
  
  };
  

  //  async recupererpartieEntiersTemperature (temperature: number) {
    
  //   return null;
  // }

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    //loop:true,
    spaceBetween:10,
    autoplay:true
  }


  //deconnexion
  deconnexion(){
    this.storageService.clean();
    this.router.navigateByUrl("/connexion");

  }




  //popup
  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ChoisirProfilComponent,
      event: ev,
      translucent: true,
      cssClass: 'my-custom-class',
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        data: 'Data passed to PopoverPage'
      }
    });
    return await popover.present();
  }


  closePopover() {
    this.popoverController.dismiss();
}

   
  
}
