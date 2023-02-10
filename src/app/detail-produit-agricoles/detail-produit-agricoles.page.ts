import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';

@Component({
  selector: 'app-detail-produit-agricoles',
  templateUrl: './detail-produit-agricoles.page.html',
  styleUrls: ['./detail-produit-agricoles.page.scss'],
})
export class DetailProduitAgricolesPage implements OnInit {

  
  idProduitActuel:any
  lesvarietesDuProduitActuel:any
  // statusubvention:boolean = false;

  constructor(
    private donneesStockerService: DonneesStockerService,
    private produitAgricolesService: ProduitAgricolesService,
    private routes : ActivatedRoute,
    private navCtrl: NavController,

    ) { }

  ionViewDidEnter(){
    this.donneesStockerService.showMenu.next(false);
  }


  detailsProduitsAgricoles = {
    id:0,
    nom:"",
    description:"",
    photo:"",
    statusubvention:false
  }

  ngOnInit() {
    this.donneesStockerService.showMenu.next(false);
    this.idProduitActuel = this.routes.snapshot.params['idproduit'];
    // alert(this.idProduitActuel)
    this.recupererDetailsDunProduitAgricole();
    this.recupererLesVarietesDunProduit();

    // if(this.detailsProduitsAgricoles.statusubvention == true){
    //   this.statusubvention == true
    // }

  }

  options = {
    slidesPerView:3,   // NOMBRE DE SLIDE PAR PAGE = 1
    centeredSlider:true,
    //loop:true,
    spaceBetween:10,
    autoplay:true
  }

    //pour retourner en arriere
retourner() {
  this.navCtrl.back();
}

  recupererDetailsDunProduitAgricole(){
    this.produitAgricolesService.recupererLesDetailsProduitAgricole(this.idProduitActuel).subscribe(data =>{
      this.detailsProduitsAgricoles = data;
      console.log(this.detailsProduitsAgricoles)
    })
  }

  recupererLesVarietesDunProduit(){
    this.produitAgricolesService.recupererLesVarietesDunProduitAgricole(this.idProduitActuel).subscribe(data =>{
      this.lesvarietesDuProduitActuel = data;
    })
  }




}
