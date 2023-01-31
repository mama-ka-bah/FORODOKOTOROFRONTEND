import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-culture-parserelle',
  templateUrl: './culture-parserelle.component.html',
  styleUrls: ['./culture-parserelle.component.scss'],
})
export class CultureParserelleComponent implements OnInit {

    detailParserelleClique:any;
    idparserelleEnvoyer:any;
    lesCultivesActivesDuneParserelle:any;
    lesCultivesStockerDansSession:any;
    lesProduitAgricoleRecuperer:any;
    lesSemencesPourLeProduitActive:any;

    resultatatAjoutCultive:any;
  
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
   //verifie si le formulaire est valide
   if(this.myForm.valid) {
    const cultive = {
      "datedebutsemis":this.myForm.controls.datedebutsemis.value,
      "datefinsemis":this.myForm.controls.datefinsemis.value,
      "quantiteseme":this.myForm.controls.quantiteSemis.value
    }

    const varieteid =  this.myForm.controls.semence.value;

    Swal.fire({
      title: 'Etes vous sur d\'ajouter cette parserelle',
      showDenyButton: true,
      confirmButtonText: 'Envoyer',
      denyButtonText: `Annuler`,
      heightAuto:false,
      position:'center'
    }).then((result) => {
      if (result.isConfirmed) {  
        this.produitAgricolesService.ajouterCultive(cultive, varieteid, this.idparserelleEnvoyer).subscribe(data => {
          this.resultatatAjoutCultive = data;
          console.log(this.resultatatAjoutCultive);

          ///si l'ajout de parserelle a marché
          if(this.resultatatAjoutCultive.status == 1){
            // this.modalCtrl.dismiss(this.resultatAjoutChamp);
            this.myForm.reset();
            Swal.fire({
              icon: 'success',
              title: data.message,
              timer: 2000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            })
          }else{
            Swal.fire({
              icon: 'info',
              title: data.message,
              showConfirmButton: true,
              heightAuto:false,
            })
          }
          
        })
      } 
    })

   }
}


   
  recupererlesCultiveActiveDuneParserelle(){
    this.champService.recupererLesCultiveDuneParsererelle(this.idparserelleEnvoyer).subscribe(data =>{
      this.lesCultivesActivesDuneParserelle = data;
      this.storageService.saveCultive(this.lesCultivesActivesDuneParserelle);
    })
  }

  //ici je recupere l'index du cultive cliqué pour afficher ces details
  voirDetailDuneCultive(indexCultiveDansSession:any){
    this.modalCtrl.dismiss();

    //ces cet index qui se trouve dans l'url dans la page detail cultive
   this.router.navigate(["/detail-parserelle", indexCultiveDansSession]);
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
