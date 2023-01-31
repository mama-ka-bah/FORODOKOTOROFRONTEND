import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';

@Component({
  selector: 'app-detail-produit-agricoles',
  templateUrl: './detail-produit-agricoles.page.html',
  styleUrls: ['./detail-produit-agricoles.page.scss'],
})
export class DetailProduitAgricolesPage implements OnInit {

  constructor(private donneesStockerService: DonneesStockerService) { }

  ionViewDidEnter(){
    this.donneesStockerService.showMenu.next(false);
  }

  ngOnInit() {
    this.donneesStockerService.showMenu.next(false);
  }

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    //loop:true,
    spaceBetween:10,
    autoplay:true
  }


}
