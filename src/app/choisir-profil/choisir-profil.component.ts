import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choisir-profil',
  templateUrl: './choisir-profil.component.html',
  styleUrls: ['./choisir-profil.component.scss'],
})
export class ChoisirProfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  itemSelected(item: string) {
    // console.log("Selected Item", item);
  }

}
