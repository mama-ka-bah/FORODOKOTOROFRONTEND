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


@Component({
  selector: 'app-detail-publicationn',
  templateUrl: './detail-publicationn.page.html',
  styleUrls: ['./detail-publicationn.page.scss'],
})
export class DetailPublicationnPage implements OnInit {

  idconseilActuel:any;
  lescommentairesDunePublication:any; //conseil uniquement now
  detailPublication:any = {
    datepub: "",
    description: "",
    etat: true,
    id: 0,
    media: "",
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


  ngOnInit() {
    this.idconseilActuel = this.routes.snapshot.params['id'];
    this.recupererDetailDuneCommentaire();
    this.recupererLesCommmentaireDunePublication();
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


  //recupere Detail Dune Commentaire
  recupererDetailDuneCommentaire(){
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
          this.recupererDetailDuneCommentaire();
          this.recupererLesCommmentaireDunePublication();
       })
  
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

}
