import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MeteoService } from '../services/meteo.service';
import { Pipe, PipeTransform } from '@angular/core';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  tmp:any;
  degre:any;
  ville:any;
  icon:any;
  tmp_max :any;
  tmp_min:any;
  constructor(private meteoservice : MeteoService) {}
 
  ngOnInit(): void {
    this.getCurrentLocation();
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

  this.meteoservice.pregetWeather(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((data) =>{
    
    this.tmp =  data;
    console.log(data);
  })
  
  };

  

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    //loop:true,
    spaceBetween:10,
    autoplay:true
  }

}
