import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-devenir-agriculteur',
  templateUrl: './devenir-agriculteur.component.html',
  styleUrls: ['./devenir-agriculteur.component.scss'],
})
export class DevenirAgriculteurComponent implements OnInit {

  constructor(    public popoverController: PopoverController,
    ) { }

  ngOnInit() {}

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  closePopover() {
    let data = { etat: false};
    this.popoverController.dismiss(data);
  }

  
  envoyer() {
    let data = { etat: true};
    this.popoverController.dismiss(data);
  }

}
