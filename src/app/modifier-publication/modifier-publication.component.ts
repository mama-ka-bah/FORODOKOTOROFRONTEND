import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { CommunauteService } from '../services/communaute.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-modifier-publication',
  templateUrl: './modifier-publication.component.html',
  styleUrls: ['./modifier-publication.component.scss'],
})
export class ModifierPublicationComponent implements OnInit {

  
erreur:boolean | undefined
file:any;
currentUser:any;
resultatAjoutPub: any;
myForm:any
publication:any;

  constructor(
    //params est utiliser pour recuperer des données envoyées à ce composant
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private champService: ChampService,
    private storageService: StorageService,
    private router : Router,
    public navCtrl: NavController,
    private produitAgricolesService: ProduitAgricolesService,
    private stocksService: StocksService,
    private communauteService: CommunauteService
    ) {

       //ici je recuperere ces données (detail de la publication)
    this.publication = this.navParams.get('data');
   
      //l'objet form froup lié à mon formulaire dans le template
  this.myForm = new FormGroup({
    titre: new FormControl(this.publication.titre,  [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    soustitre: new FormControl(this.publication.titre,  [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    lien: new FormControl(this.publication.lien,  [Validators.minLength(5), Validators.maxLength(160)]),

    description: new FormControl(this.publication.description, [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
    
    file: new FormControl('', [

      (control) => {
        const file = control.value;
        if (!file) {
          return null;
        }
    
        // Check if the video size is within the limit
        const MAX_SIZE = 10000000; // 10 MB
        if (file.size > MAX_SIZE) {
          return { maxSize: true };
        }
        return null;
      }

    ]),
    fileSource: new FormControl('', 
    )

});
    }


  
    
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


   //cette fonction permet de fermer le modal
   async closeModal() {
    await this.modalCtrl.dismiss();
   }

  ngOnInit() { 
    this.currentUser = this.storageService.getUser();
  }

  //La fonction appeler lors de l'envoie de mon formulaire
    submitForm() {

      //verifie si le formulaire est valide
      if(this.myForm.valid) {

        this.file = this.myForm.controls.fileSource.value;
    
        // alert(this.myForm.controls.semence.value)


          const publicationAEnvoyer = {
                "titre":this.myForm.controls.titre.value,
                "soustitre":this.myForm.controls.soustitre.value,
                "description":this.myForm.controls.description.value,
                "lien":this.myForm.controls.lien.value,
               }      

            // Fermer le modal et retourner les données du formulaire à notre page
            Swal.fire({
              text: 'Etes vous sûr d\'ajouter ce conseil',
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: 'Ajouter',
              denyButtonText: `Annuler`,
              heightAuto:false,
              position:'center'
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {         
                this.communauteService.modifierPublication(publicationAEnvoyer, this.publication.id).subscribe(data =>{
                  this.resultatAjoutPub = data;
                  // console.log(data);

                  ///si l'ajout du champ a marché
                  if(this.resultatAjoutPub.status == 1){
                   // this.router.navigateByUrl("/profil/champs");
                  // this.router.navigate(['/profil/champs']);
                    this.modalCtrl.dismiss(this.resultatAjoutPub);
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
                    this.router.navigate(['/detail-publication', this.publication.id]);
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


    async openLien(lien:any) {
     
      Swal.fire({
        text: 'Vous serez rediriger vers une ressource externe',
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
