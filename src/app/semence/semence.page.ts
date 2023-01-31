import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';

@Component({
  selector: 'app-semence',
  templateUrl: './semence.page.html',
  styleUrls: ['./semence.page.scss'],
})
export class SemencePage implements OnInit {

  constructor(private donneesStockerService: DonneesStockerService) { }

  ionViewDidEnter(){
    this.donneesStockerService.showMenu.next(false);
  }

  ngOnInit() {
    this.donneesStockerService.showMenu.next(false);
  }

}
