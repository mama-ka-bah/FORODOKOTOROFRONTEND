import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  }

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    loop:true,
    spaceBetween:10,
    autoplay:true
  }

}
