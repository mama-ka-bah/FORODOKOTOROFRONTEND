import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-produit-agricoles',
  templateUrl: './detail-produit-agricoles.page.html',
  styleUrls: ['./detail-produit-agricoles.page.scss'],
})
export class DetailProduitAgricolesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    //loop:true,
    spaceBetween:10,
    autoplay:true
  }


}
