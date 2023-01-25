import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.page.html',
  styleUrls: ['./marche.page.scss'],
})
export class MarchePage implements OnInit {

  constructor(private donneesService: DonneesStockerService) { }

  ngOnInit() {
    this.donneesService.setpageActuel("Marché");
  }

}
