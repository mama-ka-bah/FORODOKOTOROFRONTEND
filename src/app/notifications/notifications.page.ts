import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { __values } from 'tslib';
import { DetailNotificationComponent } from '../detail-notification/detail-notification.component';
import { ChargementService } from '../services/chargement.service';
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
  lesNotifications: any;

  constructor(
    private notificationService: NotificationService,
     private storageService: StorageService,
     private donneeService: DonneesStockerService,
     public popoverController: PopoverController,
     private chargementService: ChargementService
     ) { }

  lesNotificationsNonLus:any;
  lesNotificationsLus:any;
  // toutesLesNotifications:any;
  currentUser:any

  toutActive:boolean = false;
  nonLuActive:boolean = false;
  luActive:boolean = false;

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.luActive = true
    this.chargementService.presentLoading();
    this.ionViewWillEnter();
    this.chargementService.dismissLoading();
  }

  ionViewWillEnter(){  
    // this.donneeService.nombreDeNotificationNonLu$.subscribe(value => {
    //   this.nombreDeNotificationNonLu = value;
    // });

    // this.notificationService.recupererNotificationLuUser(this.currentUser.id).subscribe(data =>{
    //   this.lesNotificationsLus = data;
    // });
    this.recupererNombreDENotifNonLus();
    this.recupererNotifLus();
    this. recupererNotificationUser();
    this.recupererNotificationNonLu();
  }


  //active le bouton lu
  activeLu(){
    this.toutActive = false;
    this.nonLuActive = false;
    this.luActive = true;
  }

  activeTout(){
    this.toutActive = true;
    this.nonLuActive = false;
    this.luActive = false;
  }


  //active le bouton non lu
  activeNonLu(){
    this.nonLuActive = true;
    this.luActive = false;

    const notis = {
      "lu":true
    }

    // this.notificationService.recupererNotificationNonLuUser(this.currentUser.id).subscribe(data =>{
    //   this.lesNotificationsNonLus = data;
    // })
    // this.donneeService.nombreDeNotificationNonLu.next(0);

    // this.donneeService.nombreDeNotificationNonLu$.subscribe(value => {
    //   this.nombreDeNotificationNonLu = value;
    // });

    // this.notificationService.marquerLesNotificationDunUserCommeLus(this.currentUser.id, notis).subscribe(data =>{
    //   console.log("etat changé");
    // })

  }


  //permet de recuperer toutes les notification lus d'un user
  recupererNotifLus(){

     this.notificationService.recupererNotificationLuUser(this.currentUser.id).subscribe(data =>{
      this.lesNotificationsLus = data;
    });

  }


  //permet de recuperer le nombre de notification d'un user
  recupererNombreDENotifNonLus(){
    //on recuperer le nombre de notification
    this.notificationService.recupererNotificationNonLuDunUser(this.currentUser.id).subscribe(value => {

      //on met à jour le nombre de notification dans donnée service
      this.donneeService.nombreDeNotificationNonLu.next(value);

      //on recuperer la nouvellle valeur du nombre de notification dans donnée service
      this.donneeService.nombreDeNotificationNonLu$.subscribe(value => {
        this.nombreDeNotificationNonLu = value;
      });

    });
  }

  //permet de recuperer toutes les notifications non lus d'un user
  recupererNotificationNonLu(){
    this.notificationService.recupererNotificationNonLuUser(this.currentUser.id).subscribe(data =>{
      this.lesNotificationsNonLus = data;
    })
  }

  //permet de recuperer toutes les notification d'un user
  recupererNotificationUser(){
    this.notificationService.recupererNotificationNonLuUser(this.currentUser.id).subscribe(data =>{
      this.lesNotifications = data;
    })
  }


  //permet de marquer une notification comme lu
  marquerUneNotifiCommeLu(idNotif:any, notification:any){

    if(notification.lu == false){

      const notis = {
        "lu":true
      }
      
      this.notificationService.marquerLesNotificationDunUserCommeLus(idNotif, notis).subscribe(data =>{
        console.log("etat changé");
      })
  
     // this.donneeService.nombreDeNotificationNonLu.next(0);
     this.recupererNotificationNonLu();
     this.recupererNombreDENotifNonLus();
    //  alert(this.nombreDeNotificationNonLu)

    }
  }

   //popup
   async detailNotification(ev: any, detailNotification:any) {
    const popover = await this.popoverController.create({
      component: DetailNotificationComponent,
      event: ev,
      translucent: true,
      componentProps: {
        data: detailNotification,
      }
    });

    await popover.present();

    popover.onDidDismiss().then((data) => {
      console.log(data.data);
   })

  }

 

}
