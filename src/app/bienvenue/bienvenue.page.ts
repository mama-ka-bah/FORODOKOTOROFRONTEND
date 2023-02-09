import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.page.html',
  styleUrls: ['./bienvenue.page.scss'],
})
export class BienvenuePage implements OnInit {

  currentUser:any;

  constructor(
    private storageService : StorageService,
    private router : Router
    ) { }

  ngOnInit() {
   
  }

}
