import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, IonRefresher, ModalController, NavParams } from '@ionic/angular';
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
  
  //code lié à mon modal pour gerer sa fermeture debut
  @ViewChild(IonModal) modal!: IonModal;

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }  //code lié à mon modal pour gerer sa fermeture debut


  //permet de gerer le rafraichissement de la page à revoir (debut)
  @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;
  refreshPage() {
    this.refresher.complete();
  }

  doRefresh(event:any) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
    //permet de gerer le rafraichissement de la page à revoir (fin)


    detailParserelleClique:any;
    idparserelleEnvoyer:any;
    lesCultivesActivesDuneParserelle:any;
    lesCultivesStockerDansSession:any;
    lesProduitAgricoleRecuperer:any;
    lesSemencesPourLeProduitActive:any;

    resultatatAjoutCultive:any;

    existeCultive:boolean | undefined;
    statusParserelle:boolean | undefined;
  
    //l'objet form froup lié à mon formulaire dans le template
    myForm = new FormGroup({
      produitAgricole: new FormControl('',  [Validators.required]),
      semence: new FormControl('',  [Validators.required]),
      datedebutsemis: new FormControl(null, [Validators.required]),
      datefinsemis: new FormControl(null, [Validators.required]),
      quantiteSemis: new FormControl('', [Validators.required,  Validators.maxLength(6)])
  });

  desactiverBoutonSemer(){
    if(this.detailParserelleClique.status == "OCCUPE"){
      this.statusParserelle = true;
    }else{
      this.statusParserelle =false;
    }
  }

 
  ionViewWillEnter(){
   
    this.desactiverBoutonSemer();
    this.recupererlesCultiveActiveDuneParserelle();
    this.recupererTousLesProduitsAgricoles();

  }

  ngOnInit() {
    this.ionViewWillEnter();
   }

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
      text: 'Etes vous sur d\'ajouter cette parserelle',
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
            this.dismiss();
            this.ngOnInit();
            this.myForm.reset();
            this.recupererParserelleParId();
            Swal.fire({
              icon: 'success',
              text: data.message,
              timer: 2000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            })
            this.ngOnInit();
          }else{
            Swal.fire({
              icon: 'info',
              text: data.message,
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

      if(data.length > 0){
        this.storageService.saveCultive(this.lesCultivesActivesDuneParserelle);
        this.existeCultive = true;
      }else{
        this.existeCultive = false;
      }

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

  recupererParserelleParId(){
    this.champService.recupererParserelleParId(this.idparserelleEnvoyer).subscribe(data => {
      this.detailParserelleClique = data;
      this.desactiverBoutonSemer();
    })
  }



    //cette fonction permet de fermer le modal
    async closeModal() {
      await this.modalCtrl.dismiss();
     }




}
