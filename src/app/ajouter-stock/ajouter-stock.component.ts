import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-ajouter-stock',
  templateUrl: './ajouter-stock.component.html',
  styleUrls: ['./ajouter-stock.component.scss'],
})
export class AjouterStockComponent implements OnInit {

  
  mondata = {
    name: 'keita',
    age: 23,
    address: {
        city: 'Badinko'
    },
    hobbies: ['meditation', 'musique', 'voyage']
};
erreur:boolean | undefined
file:any
currentUser:any
resultatAjoutStock:any
lesProduitAgricoleRecuperer:any
lesSemencesPourLeProduitActive:any

  //l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    nom: new FormControl('',  [Validators.required, Validators.minLength(2), Validators.minLength(255)]),
    nombrekilo: new FormControl('',  [Validators.required, Validators.min(10), Validators.max(100000000)]),

    prixkilo: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000000000)]),
    semence: new FormControl('', [Validators.required]),
    typeStock: new FormControl('', [Validators.required]),
    produitAgricole: new FormControl('', [Validators.required]),
    
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
});

get fstocks() {
  return this.myForm.controls;
}


onFileChangePermis(event: any) {

  if (event.target.files.length > 0) {

    const file = event.target.files[0];

    this.myForm.patchValue({

      fileSource: file

    });

  }

}

  constructor(
    //params est utiliser pour recuperer des données envoyées à ce composant
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
    public navCtrl: NavController,
    private produitAgricolesService: ProduitAgricolesService,
    private stocksService: StocksService
    ) {
    //ici je recuperere ces données dans mondata  
    this.mondata = this.navParams.get('data');
    // console.log(this.mondata);
    
    this.myForm.get('produitAgricole')!.valueChanges.subscribe((value: any) => {
      this.recupererLesSemencesProduitAgricole(value); 
    });

   }

   recupererTousLesProduitsAgricoles(){
    this.produitAgricolesService.recupererParsererelleDunChamp().subscribe(data =>{
      this.lesProduitAgricoleRecuperer = data;
      // console.log("produit agricole " +JSON.stringify(this.lesProduitAgricoleRecuperer));
    })
  }

  recupererLesSemencesProduitAgricole(idproduit:any){
    this.produitAgricolesService.recupererLesVarietesDunProduitAgricole(idproduit).subscribe(data =>{
      this.lesSemencesPourLeProduitActive = data;
      // console.log("semence " + JSON.stringify(this.lesSemencesPourLeProduitActive));
    })
  }

   //cette fonction permet de fermer le modal
   async closeModal() {
    await this.modalCtrl.dismiss();
   }

  ngOnInit() { 
    this.currentUser = this.storageService.getUser();
    this.recupererTousLesProduitsAgricoles();
  }

  //La fonction appeler lors de l'envoie de mon formulaire
    submitForm() {

      //verifie si le formulaire est valide
      if(this.myForm.valid) {

        this.file = this.myForm.controls.fileSource.value;
        const idVariete = this.myForm.controls.semence.value;

        // alert(this.myForm.controls.semence.value)


          const stocksReçu = [ 
              {
                "libelle":this.myForm.controls.nom.value,
                "prixkilo":this.myForm.controls.prixkilo.value,
                "nombrekilo":this.myForm.controls.nombrekilo.value,
                "typestock":this.myForm.controls.typeStock.value
               }      
        ]

        const data:FormData=new FormData();
        data.append('file', this.file);
        data.append('stocksReçu', JSON.stringify(stocksReçu).slice(1,JSON.stringify(stocksReçu).lastIndexOf(']')));

            // Fermer le modal et retourner les données du formulaire à notre page
            Swal.fire({
              text: 'Etes vous sur d\'ajouter ce stock',
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: 'Ajouter',
              denyButtonText: `Annuler`,
              heightAuto:false,
              position:'center'
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {         
                this.stocksService.ajouterStock( idVariete, this.currentUser.id, data).subscribe(data =>{
                  this.resultatAjoutStock = data;
                  // console.log(data);

                  ///si l'ajout du champ a marché
                  if(this.resultatAjoutStock.status == 1){
                   // this.router.navigateByUrl("/profil/champs");
                  // this.router.navigate(['/profil/champs']);
                    this.modalCtrl.dismiss(this.resultatAjoutStock);
                    Swal.fire({
                      icon: 'success',
                      text: data.message,
                      // showConfirmButton: true,
                      timer: 2000,
                      customClass: {
                        container: 'small-text'
                      },
                      heightAuto:false,
                    })
                    this.router.navigate(['/profil/stockprofil']);
                  }else{
                    Swal.fire({
                      icon: 'info',
                      text: data.message,
                      showConfirmButton: true,
                      // timer: 2000,
                      heightAuto:false,
                    })
                  }
                  
                })                
              } 
            })




           

      
         //orrive là lorsque les champs nesont pas validé
        } else {
          this.erreur = true;
          // Afficher une erreur si les données sont manquantes
          // console.log("veuillez remplir tous les champs");
      }
    }


    async openTOS() {
     
      
      Swal.fire({
        text: 'Vous serez rediriger vers google Maps',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Accepter',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {         
          await Browser.open({ url: 'https://www.google.com/maps'});               
        } 
      })
     

    }



}
