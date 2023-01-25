import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { AgriculteurService } from '../services/agriculteur.service';


@Component({
  selector: 'app-devenir-transporteur',
  templateUrl: './devenir-transporteur.component.html',
  styleUrls: ['./devenir-transporteur.component.scss'],
})
export class DevenirTransporteurComponent implements OnInit {

  mondata:any
  erreur:any
  etat:boolean | undefined
  photoCart:any;

  ngOnInit() {}


  
  constructor(
    //params est utiliser pour recuperer des données envoyées à ce composant
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService
    ) {
    //ici je recuperere ces données dans mondata  
    this.mondata = this.navParams.get('data');
    console.log(this.mondata);
   }

   //cette fonction permet de fermer le modal
   async closeModal() {
    await this.modalCtrl.dismiss();
   }


   myForm = new FormGroup({

    numeroplaque: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
    disponibilite: new FormControl('', [Validators.required]),
    
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])

  });

  get fRegion() {
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


    //La fonction appeler lors de l'envoie de mon formulaire
    submitForm() {

      //verifie si le formulaire est valide
      if(this.myForm.valid) {

          console.log("Donnée envoyé avec succès: " + this.myForm.controls.disponibilite.value);
          // console.log("Donnée envoyé avec succès: " + this.myForm.controls..value);

          if(this.myForm.controls.disponibilite.value == "Disponible"){
            this.etat = true;
          }else{
            this.etat = false
          }

          this.photoCart = this.myForm.controls.fileSource.value;

          const donneesTransporteur = [
            
              {
                "numeroplaque":this.myForm.controls.numeroplaque.value,
                "disponibilite":this.etat
               }
            
            
        ]
    

            // Fermer le modal et retourner les données du formulaire à notre page
            this.modalCtrl.dismiss({"photo":this.photoCart, "donneesTransporteur":donneesTransporteur});

         console.log("Donnée envoyé avec succès " + this.myForm.controls.numeroplaque.value);
      
         //orrive là lorsque les champs nesont pas validé
        } else {
          this.erreur = true;
          // Afficher une erreur si les données sont manquantes
          console.log("veuillez remplir tous les champs");
      }
    }
 




}
