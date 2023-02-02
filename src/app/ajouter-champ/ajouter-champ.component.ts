import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';

@Component({
  selector: 'app-ajouter-champ',
  templateUrl: './ajouter-champ.component.html',
  styleUrls: ['./ajouter-champ.component.scss'],
})
export class AjouterChampComponent implements OnInit {

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
resultatAjoutChamp:any

  //l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    nom: new FormControl('',  [Validators.required, Validators.minLength(2)]),
    longueur: new FormControl('',  [Validators.required, Validators.minLength(2)]),
    largeur: new FormControl('', [Validators.required, Validators.minLength(2)]),
    adresse: new FormControl('', [Validators.required, Validators.minLength(2)]),
    longitude: new FormControl('', [Validators.required, Validators.minLength(2)]),
    latitude: new FormControl('', [Validators.required, Validators.minLength(2)]),
    
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
});

get fChamp() {
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

    ) {
    //ici je recuperere ces données dans mondata  
    this.mondata = this.navParams.get('data');
    console.log(this.mondata);
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

          const champReçu = [
            
              {
                "nom":this.myForm.controls.nom.value,
                "longueur":this.myForm.controls.longueur.value,
                "largeur":this.myForm.controls.largeur.value,
                "adresse":this.myForm.controls.adresse.value,
                "longitude":this.myForm.controls.longitude.value,
                "latitude":this.myForm.controls.latitude.value
               }      
            
        ]

        const data:FormData=new FormData();
        console.log("mon fichier: " + this.file)
        data.append('file', this.file);
        data.append('champReçu', JSON.stringify(champReçu).slice(1,JSON.stringify(champReçu).lastIndexOf(']')));
            // Fermer le modal et retourner les données du formulaire à notre page

            Swal.fire({
              title: 'Etes vous sur d\'envoyer cette demande',
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: 'Envoyer',
              denyButtonText: `Annuler`,
              heightAuto:false,
              position:'center'
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {         
                this.champService.ajouterChamp(data, this.currentUser.id).subscribe(data =>{
                  this.resultatAjoutChamp = data;
                  console.log(data);

                  ///si l'ajout du champ a marché
                  if(this.resultatAjoutChamp.status == 1){
                    this.modalCtrl.dismiss(this.resultatAjoutChamp);
                    this.router.navigateByUrl("/profil/champs");
                    Swal.fire({
                      icon: 'success',
                      title: data.message,
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
                      title: data.message,
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
          console.log("veuillez remplir tous les champs");
      }
    }

}
