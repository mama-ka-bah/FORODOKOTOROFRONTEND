import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';

@Component({
  selector: 'app-transporteurs',
  templateUrl: './transporteurs.page.html',
  styleUrls: ['./transporteurs.page.scss'],
})
export class TransporteursPage implements OnInit {

  constructor(private donneesService: DonneesStockerService) { }

  ngOnInit() {
    this.donneesService.setpageActuel("Transporteurs");
  }

  reloadPage(): void {
    window.location.reload();
  }

}
