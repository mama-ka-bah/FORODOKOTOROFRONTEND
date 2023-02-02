import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-profil-transporteur',
  templateUrl: './profil-transporteur.page.html',
  styleUrls: ['./profil-transporteur.page.scss'],
})
export class ProfilTransporteurPage implements OnInit {

  currentUser:any

  constructor( private storageService : StorageService,
    ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
  }

}
