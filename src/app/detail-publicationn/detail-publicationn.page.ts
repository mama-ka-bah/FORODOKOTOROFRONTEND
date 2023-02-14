import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { CommentairesComponent } from '../commentaires/commentaires.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { CommunauteService } from '../services/communaute.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';
import { Browser } from '@capacitor/browser';
import Swal from 'sweetalert2';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { ModifierPublicationComponent } from '../modifier-publication/modifier-publication.component';
import { ModifierCommentaireComponent } from '../modifier-commentaire/modifier-commentaire.component';


@Component({
  selector: 'app-detail-publicationn',
  templateUrl: './detail-publicationn.page.html',
  styleUrls: ['./detail-publicationn.page.scss'],
})
export class DetailPublicationnPage implements OnInit {

  idconseilActuel:any;
  lescommentairesDunePublication:any; //conseil uniquement now
  currentUser:any

  detailPublication:any = {
    datepub: "",
    description: "",
    etat: true,
    id: 0,
    media: "",
    nombreaime:0,
    nombrenonaime:0,
    nombrecommentaire:0,
    posteur:{id: 0, username: '', email: '', nomcomplet: '', photo: ''},
    soustitre: "",
    titre: "",
    typepub: "",
    lien:""
  };

  constructor(
    private routes: ActivatedRoute,
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private meteoservice: MeteoService,
    private stockService: StocksService,
    private communauteService:CommunauteService,


    ) {}

    aime:boolean = false;
    nonAime:boolean = false;


  ngOnInit() {
    this.idconseilActuel = this.routes.snapshot.params['id'];
    this.recupererDetailDunePublication();
    this.recupererLesCommmentaireDunePublication();
    this.currentUser = this.storageService.getUser();
  }

    //pour retourner en arriere
retourner() {
  this.navCtrl.back();
}

  //recupere Les Commmentaire Dune Publication
  recupererLesCommmentaireDunePublication(){
    this.communauteService.recupererCommentairesDunepublication(this.idconseilActuel).subscribe(data =>{
      this.lescommentairesDunePublication = data;
      console.log(data)
    })
  }


  //recupere Detail Dune publication
  recupererDetailDunePublication(){
    this.communauteService.recupererDetailDunePublication(this.idconseilActuel).subscribe(data =>{
      this.detailPublication = data;
      console.log(data)
    })
  }

  
      //popup permettant d'ajouter un commentaire
      async ajouterCommentaire(ev: any) {
        const popover = await this.popoverController.create({
          component: CommentairesComponent,
          event: ev,
          translucent: true,
          componentProps: {
            data: this.idconseilActuel,
          }
        });
  
        await popover.present();
    
        popover.onDidDismiss().then((data) => {
          console.log(data.data);
          this.recupererDetailDunePublication();
          this.recupererLesCommmentaireDunePublication();
       })
  
      }




      
      //popup permettant modifier un commentaire
      async modifierCommentaire(ev: any, commentaire:any) {
        const popover = await this.popoverController.create({
          component: ModifierCommentaireComponent,
          event: ev,
          translucent: true,
          componentProps: {
            data: commentaire
          }
        }); 
        await popover.present();    
        popover.onDidDismiss().then((data) => {
          console.log(data.data);
          this.recupererDetailDunePublication();
          this.recupererLesCommmentaireDunePublication();
       })
      }



      aimerUnePublication(valeurAime:any){
        const aimes = {
          "aime":valeurAime
        }
    
        this.communauteService.aimerUnePublication(this.idconseilActuel, this.currentUser.id, aimes).subscribe(data =>{
          this.detailPublication = data;
          console.log(data)
        })
    
        // this.recupererDetailStock();
        //this.recupererListeAimesDunStock();
       
    
      }





      async openLiens(lien:any) {
     
        Swal.fire({
          text: 'Vous serez rediriger vers une resource externe',
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: 'Accepter',
          denyButtonText: `Annuler`,
          heightAuto:false,
          position:'center'
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {         
            await Browser.open({ url: lien});               
          } 
        })
        
      }





        //on fait appel au composant pout ajouter une nouvelle ction
   async modifierPublication(publication:any) {
    const modal = await this.modalCtrl.create({
      //le composant contenant le modal
      component:ModifierPublicationComponent,
      //Ici on envoi l'id de cultive actuel au composant contenant le formulaire de creation de 
      componentProps: {
      data: publication
  }
    });

    //Cette methode contient les 
    modal.onDidDismiss().then((result) => {
     console.log(JSON.stringify(result));
    this.recupererDetailDunePublication();
    });
    await modal.present();
  }

}
