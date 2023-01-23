import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthentificationService } from '../services/authentification.service';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

//les données du formulaire
  // form: any = {
  //   username: null,
  //   email: null,
  //   nomComplet: null,
  //   password: null,
  //   confpassword: null,
  // };


  
//l'objet form froup lié à mon formulaire dans le template
//ici on precise que les champs codes ne peuvent prendre que des chiffres comprise entre 0 et 9
form = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  nomComplet: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
  email: new FormControl('', [Validators.minLength(3), Validators.maxLength(30),  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  confPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
  
});


  nomComplet:any;
  email:any;
  password:any;
  username:any;
  confPassword:any;

  valeurErreur:any
  erreur: boolean | undefined;


  //les booleans conteant l'etat et le message  de la connexion
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authentificationService: AuthentificationService,
    private router : Router,
    public loadingController: LoadingController
    ) { }




  //La fonction appleleé lorsqu'on prend le bouttton envoyé
  onSubmit(): void {
    //recuperation des données envoyes par l'utilisateur dans des constantes differents
   
    this.username = this.form.controls.username.value;
    this.nomComplet = this.form.controls.nomComplet.value;
    this.email = this.form.controls.email.value;
    this.password = this.form.controls.password.value;
    this.confPassword = this.form.controls.confPassword.value;

    if(this.password == this.confPassword && this.form.valid)
    {

      const donneesuser = [{
        "username":this.form.controls.username.value,
        "nomcomplet":this.form.controls.nomComplet.value,
        "email":this.form.controls.email.value,
        "password":this.form.controls.password.value,
      }]

      console.table(donneesuser);


       //on fait appel au service de l'incription en lui envoyant les constantes declarées ci-dessus
    this.authentificationService.register(donneesuser).subscribe({
      //on rentre ici lorsque tout se passe bien
      next: data => {
        console.log(data);
        //connexion reçue à true
        this.isSuccessful = true;
        //connexion echoué à false
        this.isSignUpFailed = false;

        if(data.status == 0){
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: data.message,
            heightAuto:false
          })
        }else{
          this.presentLoading();
          this.router.navigateByUrl('/connexion');
        }
        
      },
      //on arrive ici lorsqu'il ya eu une erreur de connexion
      error: err => {
        //on recupere l'erreur
        this.errorMessage = err.error.message;
        //on est l'inscription echoué à false
        this.isSignUpFailed = true;
      }
    });
    }else if(this.password != this.confPassword && this.password.length >= 6 && this.confPassword.length >= 6){

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Mot de passe differents !',
        heightAuto:false
      });
      
      this.erreur=true
      this.valeurErreur = "Mot de passe differents";
    }else{

    }
   
  }

  //loading controlleur
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  ngOnInit() {
  }

}
