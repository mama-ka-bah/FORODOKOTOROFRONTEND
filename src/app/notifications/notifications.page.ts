import { Component, OnInit } from '@angular/core';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { NotificationService } from '../services/notification.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  nombreDeNotificationNonLu: any;

  constructor(
    private notificationService: NotificationService,
     private storageService: StorageService,
     private donneeService: DonneesStockerService
     ) { }

  lesNotificationsNonLus:any;
  lesNotificationsLus:any;
  // toutesLesNotifications:any;
  currentUser:any

  toutActive:boolean | undefined
  nonLuActive:boolean | undefined
  luActive:boolean | undefined

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.luActive = true


  }

  ionViewDidEnter(){  
    this.donneeService.nombreDeNotificationNonLu$.subscribe(value => {
      this.nombreDeNotificationNonLu = value;
    });

    this.notificationService.recupererNotificationLuUser(this.currentUser.id).subscribe(data =>{
      this.lesNotificationsLus = data;
    });
  }


  activeLu(){
    this.toutActive = false;
    this.nonLuActive = false;
    this.luActive = true;
  }

  activeNonLu(){
    this.nonLuActive = true;
    this.luActive = false;

    const notis = {
      "lu":true
    }

    this.notificationService.recupererNotificationNonLuUser(this.currentUser.id).subscribe(data =>{
      this.lesNotificationsNonLus = data;
    })
    this.donneeService.nombreDeNotificationNonLu.next(0);

    this.donneeService.nombreDeNotificationNonLu$.subscribe(value => {
      this.nombreDeNotificationNonLu = value;
    });

    this.notificationService.marquerLesNotificationDunUserCommeLus(this.currentUser.id, notis).subscribe(data =>{
      console.log("etat changé");
    })
  }

 

}
