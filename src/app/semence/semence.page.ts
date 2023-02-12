import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';

@Component({
  selector: 'app-semence',
  templateUrl: './semence.page.html',
  styleUrls: ['./semence.page.scss'],
})
export class SemencePage implements OnInit {
  idSemence: any;

  detailsVarietes = {
    id:0,
    nom:"",
    cycle:"",
    taillefinal:"",
    photo:"",
    resultatparkilo:0,
    description:"",
    lien:"",
    etat:false,
    produitagricole:{},
    previsions:[]
  }
  previsions: any;

  constructor(
    private donneesStockerService: DonneesStockerService,
    private produitAgricolesService: ProduitAgricolesService,
    private routes : ActivatedRoute,
    private navCtrl: NavController,
    ) { }

  ionViewDidEnter(){
    this.donneesStockerService.showMenu.next(false);
  }

  ngOnInit() {
    this.idSemence = this.routes.snapshot.params['idvariete'];
    
    this.donneesStockerService.showMenu.next(false);
    this.recupererDetailsVarietes();
    this.recupererPrevisionsDuneVariete();
  }

//pour retourner en arriere
retourner() {
  this.navCtrl.back();
}


  recupererDetailsVarietes(){
    this.produitAgricolesService.recupererLesDetailsDunevariete(this.idSemence).subscribe(data =>{
      this.detailsVarietes = data;
      console.log(this.detailsVarietes);
    })
  }

  recupererPrevisionsDuneVariete(){
    this.produitAgricolesService.recupererPrevisionsDuneVariete(this.idSemence).subscribe(data =>{
      this.previsions = data;
      console.log(this.previsions);
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
