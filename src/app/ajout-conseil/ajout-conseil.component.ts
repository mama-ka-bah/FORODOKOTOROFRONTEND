import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { NavParams, ModalController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { ChargementService } from '../services/chargement.service';
import { CommunauteService } from '../services/communaute.service';
import { ProduitAgricolesService } from '../services/produit-agricoles.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-ajout-conseil',
  templateUrl: './ajout-conseil.component.html',
  styleUrls: ['./ajout-conseil.component.scss'],
})
export class AjoutConseilComponent implements OnInit {

erreur:boolean | undefined
file:any;
currentUser:any;
resultatAjoutPub: any;


  //l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    titre: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    soustitre: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    lien: new FormControl('',  [Validators.minLength(5), Validators.maxLength(255)]),

    description: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
    
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
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private router : Router,
    public navCtrl: NavController,
    private communauteService: CommunauteService,
    private chargementService: ChargementService
    ) {}

  
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


          const pubReçu = [ 
              {
                "titre":this.myForm.controls.titre.value,
                "soustitre":this.myForm.controls.soustitre.value,
                "description":this.myForm.controls.description.value,
                "lien":this.myForm.controls.lien.value,
                "typepub":"conseil"
               }      
        ]

        const data:FormData=new FormData();
        data.append('file', this.file);
        data.append('pubReçu', JSON.stringify(pubReçu).slice(1,JSON.stringify(pubReçu).lastIndexOf(']')));

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
                this.chargementService.presentLoading();      
                this.communauteService.ajouterPublication(data, this.currentUser.id).subscribe(data =>{
                  this.resultatAjoutPub = data;
                  // console.log(data);
                  this.chargementService.dismissLoading();
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
                    this.router.navigate(['/tabs/communautes']);
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
