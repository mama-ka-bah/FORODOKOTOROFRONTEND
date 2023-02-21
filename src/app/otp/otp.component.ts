import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  
  //declaration de mes variables
  mondata: any;

  erreur!:boolean;
  contenuErreur!:any;

//l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
});

  constructor(
    //params est utiliser pour recuperer des données envoyées à ce composant
    private navParams: NavParams,
    private modalCtrl: ModalController
    ) {
    //ici je recuperere ces données dans mondata  
    this.mondata = this.navParams.get('data');
    // console.log(this.mondata);
   }

   //cette fonction permet de fermer le modal
   async closeModal() {
    await this.modalCtrl.dismiss();
   }

  ngOnInit() { }

  //La fonction appeler lors de l'envoie de mon formulaire
    submitForm() {

      //verifie si le formulaire est valide
      if(this.myForm.valid) {

          // Fermer le modal et retourner les données du formulaire à notre page
          this.modalCtrl.dismiss({data: this.myForm.value});

          console.log("lllm lllzz lmlmlm: " + this.myForm.value);

        //  console.log("Donnée envoyé avec succès " + this.myForm.controls.email.value);
      
         //orrive là lorsque les champs nesont pas validé
        } else {
          this.erreur = true;
          // Afficher une erreur si les données sont manquantes
          // console.log("veuillez remplir tous les champs");
      }
    }
 

}

