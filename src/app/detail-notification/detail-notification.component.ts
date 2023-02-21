import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.scss'],
})
export class DetailNotificationComponent implements OnInit {
  notif:any

  constructor(
    public popoverController: PopoverController,
    // private stockService: StocksService,
    private navParams: NavParams,
  ) {
    this.notif = this.navParams.get('data');
   }

  ngOnInit() {}

  
  closePopover() {
    this.popoverController.dismiss();
  }

}
