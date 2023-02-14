import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss'],
})
export class ChangerMotDePasseComponent implements OnInit {

  //declarations des variables
  myData = {
    name: 'John Doe',
    age: 30,
    address: {
        street: 'Main St',
        city: 'New York',
        state: 'NY'
    },
    hobbies: ['reading', 'music', 'travel']
};

data: any;

mondata: any;

erreur!:boolean;
contenuErreur!:any;


//l'objet form froup lié à mon formulaire dans le template
//ici on precise que les champs codes ne peuvent prendre que des chiffres comprise entre 0 et 9
myForm = new FormGroup({
  motDePasse: new FormControl('', [Validators.required, Validators.minLength(6)]),
  motDePasseConfirme: new FormControl('', [Validators.required, Validators.minLength(6)]),
});


constructor(
  private navParams: NavParams,
  private modalCtrl: ModalController
  ) {
    //recuperation des données reçu
  this.data = this.navParams.get('data');
  console.log(this.data);
 }

 async closeModal() {
  await this.modalCtrl.dismiss();
}


//La fonction appeler lors de l'envoie de mon formulaire
submitForm() {

  //verifie si le formulaire est valide
  if(this.myForm.valid && this.myForm.controls.motDePasse.value == this.myForm.controls.motDePasseConfirme.value) {

    // Fermer le modal et retourner les données du formulaire à notre page
    this.modalCtrl.dismiss({data: this.myForm.value});

     console.log("Donnée envoyé avec succès " + this.myForm.controls.motDePasse.value);
     console.log("Donnée envoyé avec succès " + this.myForm.controls.motDePasseConfirme.value);
      
     //On arrive là lorsque les champs ne sont pas validés
    } else if (this.myForm.controls.motDePasse.value != this.myForm.controls.motDePasseConfirme.value){
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Mot de passe differents !',
        heightAuto:false
      });
  }else{

  }
}


ngOnInit(): void {
    
}


}
