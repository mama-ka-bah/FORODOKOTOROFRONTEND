import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';
import { IonContent } from '@ionic/angular';
import { IonRefresher } from '@ionic/angular';



@Component({
  selector: 'app-ajouter-parserelle',
  templateUrl: './ajouter-parserelle.component.html',
  styleUrls: ['./ajouter-parserelle.component.scss'],
})
export class AjouterParserelleComponent implements OnInit {

  @ViewChild(IonRefresher, { static: false }) refresher!: IonRefresher;

  
  refreshPage() {
    this.refresher.complete();
  }

  doRefresh(event:any) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  

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
lesChampDeCurrentUser:any

  //l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    nom: new FormControl('',  [Validators.required, Validators.minLength(2)]),
    longueur: new FormControl('',  [Validators.required, Validators.minLength(2)]),
    largeur: new FormControl('', [Validators.required, Validators.minLength(2)]),
    typeChamp: new FormControl('', [Validators.required]),
    champ: new FormControl('', [Validators.required])
});

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
    this.recuperLesChampDeUserActuel();
  }


  recuperLesChampDeUserActuel(){
    this.champService.recupererChampParProprietaire(this.currentUser.id).subscribe( data => {
      this.lesChampDeCurrentUser = data;
      console.log(this.lesChampDeCurrentUser);
    })
    
  }

  //La fonction appeler lors de l'envoie de mon formulaire
    submitForm() {

      //verifie si le formulaire est valide
      if(this.myForm.valid) {

          const parserelleReçu = [
            
              {
                "nom":this.myForm.controls.nom.value,
                "longueur":this.myForm.controls.longueur.value,
                "largeur":this.myForm.controls.largeur.value,
                "etypeparserelle":this.myForm.controls.typeChamp.value,
               }
        ]

        const data:FormData=new FormData();
        data.append('parserelleReçu', JSON.stringify(parserelleReçu).slice(1,JSON.stringify(parserelleReçu).lastIndexOf(']')));


            Swal.fire({
              title: 'Etes vous sur d\'ajouter cette parserelle',
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: 'Envoyer',
              denyButtonText: `Annuler`,
              heightAuto:false,
              position:'center'
            }).then((result) => {
              if (result.isConfirmed) {         
                this.champService.ajouterParserelle(data, this.myForm.controls.champ.value).subscribe(data =>{
                  this.resultatAjoutChamp = data;
                  console.log(data);

                  ///si l'ajout de parserelle a marché
                  if(this.resultatAjoutChamp.status == 1){
                    this.modalCtrl.dismiss(this.resultatAjoutChamp);
                    Swal.fire({
                      icon: 'success',
                      title: data.message,
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
