import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { StorageService } from '../services/stockage.service';
import { AuthentificationService } from '../services/authentification.service';
import { ChargementService } from '../services/chargement.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.scss'],
})
export class ModifierProfilComponent implements OnInit {

  form!: FormGroup;
  currentUser:any;

  resultatModif:any;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private userService: AuthentificationService,
    private chargementService: ChargementService,
    private modalCtrl: ModalController,

    ) {

      this.currentUser = this.storageService.getUser();

    this.form = this.fb.group({
      username: new FormControl(this.currentUser.username, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      nomcomplet: new FormControl(this.currentUser.nomcomplet, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      adresse: new FormControl(this.currentUser.adresse, [Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl(this.currentUser.email, [Validators.minLength(3), Validators.maxLength(30),  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });

   }

   
  //La fonction appleleé lorsqu'on prend le bouttton envoyé
  onSubmit(): void {
    //recuperation des données envoyes par l'utilisateur dans des constantes differents
   
    // this.username = this.form.controls.username.value;
    // this.nomComplet = this.form.controls.nomComplet.value;

    if(this.form.valid){
      const utilisateur = {
        "username": this.form.controls['username'].value,
        "nomcomplet": this.form.controls['nomcomplet'].value,
        "adresse": this.form.controls['adresse'].value,
        "email": this.form.controls['email'].value,
      };

      this.chargementService.presentLoading();
      this.userService.modifierProfilUtilisateur(this.currentUser.id, utilisateur).subscribe(data =>{
        this.resultatModif = data;
      })


      Swal.fire({
        text: 'Etes vous sur d\'ajouter cette parserelle',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Envoyer',
        denyButtonText: `Annuler`,
        heightAuto:false,
        position:'center'
      }).then((result) => {
        if (result.isConfirmed) {         
          this.userService.modifierProfilUtilisateur(this.currentUser.id, utilisateur).subscribe(data =>{
            this.resultatModif = data;

            Swal.fire({
              icon: 'success',
              text: "Profil modifier avec succès",
              timer: 2000,
              customClass: {
                container: 'small-text'
              },
              heightAuto:false,
            });
            this.storageService.saveUser(this.resultatModif);
            this.closeModal();
          })
        } 
      })


    }

  }

   //cette fonction permet de fermer le modal
   async closeModal() {
    await this.modalCtrl.dismiss();
   }

  ngOnInit() {
   
  }

}
