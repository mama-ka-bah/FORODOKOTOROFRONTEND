import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ChampService } from '../services/champ.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-culture-parserelle',
  templateUrl: './culture-parserelle.component.html',
  styleUrls: ['./culture-parserelle.component.scss'],
})
export class CultureParserelleComponent implements OnInit {

  detailParserelleClique:any
  idparserelleEnvoyer:any;
  lesCultivesActivesDuneParserelle:any;
  lesCultivesStockerDansSession:any;
  lesProduitAgricoleRecuperer:any
  lesSemencesPourLeProduitActive:any


  
    //l'objet form froup lié à mon formulaire dans le template
    myForm = new FormGroup({
      produitAgricole: new FormControl('',  [Validators.required]),
      semence: new FormControl('',  [Validators.required]),
      datedebutsemis: new FormControl(null, [Validators.required]),
      datefinsemis: new FormControl(null, [Validators.required]),
      quantiteSemis: new FormControl('', [Validators.required,  Validators.maxLength(6)])
  });

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
    private produitAgricolesService: ProduitAgricolesService
    
  ) {
     //ici je recuperere ces données dans mondata  
     this.detailParserelleClique = this.navParams.get('data');
     this.idparserelleEnvoyer = this.navParams.get('data1');
     console.log("Parserelle envoyer: " + this.detailParserelleClique);
     console.log("Cultives envoyer: " +JSON.stringify(this.idparserelleEnvoyer));

     this.myForm.get('produitAgricole')!.valueChanges.subscribe(value => {
      this.recupererLesSemencesProduitAgricole(value);
    });
   }



submitForm(){

}


   
  recupererlesCultiveActiveDuneParserelle(){
    this.champService.recupererLesCultiveDuneParsererelle(this.idparserelleEnvoyer).subscribe(data =>{
      this.lesCultivesActivesDuneParserelle = data;
      this.storageService.saveCultive(this.lesCultivesActivesDuneParserelle);
    })
  }

  voirDetailDuneCultive(idCultive:any){
    this.modalCtrl.dismiss();
   this.router.navigate(["/detail-parserelle"]);
  }

  recupererTousLesProduitsAgricoles(){
    this.produitAgricolesService.recupererParsererelleDunChamp().subscribe(data =>{
      this.lesProduitAgricoleRecuperer = data;
      console.log("produit agricole " +JSON.stringify(this.lesProduitAgricoleRecuperer));
    })
  }

  recupererLesSemencesProduitAgricole(idproduit:any){
    this.produitAgricolesService.recupererLesVarietesDunProduitAgricole(idproduit).subscribe(data =>{
      this.lesSemencesPourLeProduitActive = data;
      console.log("semence " + JSON.stringify(this.lesSemencesPourLeProduitActive));
    })
  }

  ngOnInit() {
    this.recupererlesCultiveActiveDuneParserelle();
    this.recupererTousLesProduitsAgricoles();
  }

    //cette fonction permet de fermer le modal
    async closeModal() {
      await this.modalCtrl.dismiss();
     }




}
