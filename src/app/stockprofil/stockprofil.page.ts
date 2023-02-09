import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { DetailStocksPage } from '../detail-stocks/detail-stocks.page';
import { ModifierProfilComponent } from '../modifier-profil/modifier-profil.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-stockprofil',
  templateUrl: './stockprofil.page.html',
  styleUrls: ['./stockprofil.page.scss'],
})
export class StockprofilPage implements OnInit {

  
  currentUser:any;
  stocksUserActuel: any;
  existe:boolean | undefined

  file:any;

  nouveauPhoto:any
  reponseUpdatePhoto:any;
  photo: any;


  constructor(private stocksService: StocksService,

      private router : Router,
      private storageService : StorageService,
      private navCtrl: NavController,
      private donneesService: DonneesStockerService,
      private modalCtrl: ModalController,
      private agriculteurService: AgriculteurService,
      public popoverController: PopoverController,
      private champService: ChampService,
      private userService: AuthentificationService 

    ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.recuperStockDunAgriculteur();
  }

  ionViewWillEnter(){

    this.donneesService.photoProfil.next(this.currentUser.photo);
   this.donneesService.photoProfil$.subscribe(value => {
     this.photo = value;
   });
  }



     //l'objet form froup lié à mon formulaire dans le template
     myForm = new FormGroup({ 
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
  });
  
  get fProfil() {
    return this.myForm.controls;
  }
  
  
  onFileChangeProfil(event: any) {
  
    if (event.target.files.length > 0) {
  
      const file = event.target.files[0];
  
      this.myForm.patchValue({
  
        fileSource: file
  
      });
  
      this.submitForm();
  
    }
  
  }
  
  submitForm() {
    //verifie si le formulaire est valide
    if(this.myForm.valid) {
      this.file = this.myForm.controls.fileSource.value;
  
      const data1:FormData=new FormData();
  
      console.log("mon fichier: " + this.file)
      data1.append('file', this.file);
      
      Swal.fire({
        text: 'Etes vous sûr enregistrer cette photo',
        showDenyButton: true,
        confirmButtonText: 'Enregistrer',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) {         
          this.userService.modifierPhotoProfil(this.currentUser.id, data1).subscribe(value =>{
            this.reponseUpdatePhoto = value;
            
            ///si l'ajout du champ a marché
            if(this.reponseUpdatePhoto.status == 1 ){
  
              console.log("data photo: " + this.reponseUpdatePhoto.message)
              
              this.currentUser.photo = this.reponseUpdatePhoto.message;

              this.donneesService.photoProfil.next( this.currentUser.photo);
              this.donneesService.photoProfil$.subscribe(value => {
                this.photo = value;
              });

              console.log(this.currentUser)
              this.storageService.saveUser(this.currentUser);
  
  
              Swal.fire({
                icon: 'success',
                text: "Modification reçu",
                // showConfirmButton: true,
                timer: 2000,
                customClass: {
                  container: 'small-text'
                },
                heightAuto:false,
              })
            }else{
              Swal.fire({
                icon: 'info',
                text: "Echec",
                showConfirmButton: true,
                // timer: 2000,
                heightAuto:false,
              })
            }
            
          })                
        } 
      })
    }
  
  }
  






  //pour retourner en arriere
retourner() {
  this.navCtrl.back();
}


  recuperStockDunAgriculteur(){
    this.stocksService.recupererStocksParProprietaire(this.currentUser.id).subscribe( (data) =>{
      this.stocksUserActuel =  data;
      // retour = JSON.stringify(data);
      // this.stocksUserActuel =  JSON.parse(retour);
      console.log(this.stocksUserActuel)

      if(this.stocksUserActuel.length === 0){
        this.existe=false;
        console.log("Je ne suis pas là: " + this.stocksUserActuel.length)
      }else{
        this.existe=true;
        
        console.log("Je suis là: " + this.stocksUserActuel.length);

        this.storageService.saveStocks(this.stocksUserActuel);

      }

    });
  }


  
  fermerCompte(){   
    this.donneesService.fermerUnCompte(this.currentUser.id);
  }


   //on fait appel au composant pout ajouter une nouvelle ction
   async modifierProfil() {
    const modal = await this.modalCtrl.create({
      //le composant contenant le modal
      component: ModifierProfilComponent,
      //Ici on envoi l'id de cultive actuel au composant contenant le formulaire de creation de 
  //     componentProps: {
  //     data: this.idDeCultiveActuel
  // }
    });

    //Cette methode contient les 
    modal.onDidDismiss().then((result) => {
     console.log(JSON.stringify(result));
     this.ngOnInit();
    });
    await modal.present();
  }

}
