import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-inputotp',
  templateUrl: './inputotp.component.html',
  styleUrls: ['./inputotp.component.scss'],
})
export class InputotpComponent implements OnInit {

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
  code1: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  code2: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  code3: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  code4: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
});

restrictInput(event:any) {
  if (event.target.value.length > 1) {
    event.preventDefault();
  }
}

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
  if(this.myForm.valid) {

    // Fermer le modal et retourner les données du formulaire à notre page
    this.modalCtrl.dismiss({data: this.myForm.value});

     console.log("Donnée envoyé avec succès " + this.myForm.controls.code1.value);
     console.log("Donnée envoyé avec succès " + this.myForm.controls.code2.value);
     console.log("Donnée envoyé avec succès " + this.myForm.controls.code3.value);
     console.log("Donnée envoyé avec succès " + this.myForm.controls.code4.value);
  
     //On arrive là lorsque les champs ne sont pas validés
    } else {
      this.erreur = true;
      // Afficher une erreur si les données sont manquantes
      console.log("veuillez remplir tous les champs");
  }
}


ngOnInit(): void {
    
}

}
