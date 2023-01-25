import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';

@Component({
  selector: 'app-produit-agricoles',
  templateUrl: './produit-agricoles.page.html',
  styleUrls: ['./produit-agricoles.page.scss'],
})
export class ProduitAgricolesPage implements OnInit {

  constructor(private donneesService: DonneesStockerService) { }

  ngOnInit() {
    this.donneesService.setpageActuel("Agricultures");
  }

}
