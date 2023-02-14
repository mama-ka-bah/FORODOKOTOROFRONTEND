import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import Swal from 'sweetalert2';
import { ChampService } from '../services/champ.service';
import { StorageService } from '../services/stockage.service';




@Component({
  selector: 'app-ajouter-phase-cultive',
  templateUrl: './ajouter-phase-cultive.component.html',
  styleUrls: ['./ajouter-phase-cultive.component.scss'],
})
export class AjouterPhaseCultiveComponent implements OnInit {
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
  
erreur:boolean | undefined;
file:any;
currentUser:any;
resultatAjoutAction:any;
idCultiveRecuperer:any;

  //l'objet form froup lié à mon formulaire dans le template
  myForm = new FormGroup({
    libelle: new FormControl('',  [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]),
    nbrepluies: new FormControl('',  [Validators.required, Validators.min(10), Validators.max(100000000)]),
    remarques: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    datedebut: new FormControl(null, [Validators.required]),
    datefin: new FormControl(null, [Validators.required]),

    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
});

get fphase() {
  return this.myForm.controls;
}


onFileChangePhase(event: any) {

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
    this.idCultiveRecuperer = this.navParams.get('data');
   }

  ngOnInit() {}

  //cette fonction permet de fermer le modal
  async closeModal() {
    await this.modalCtrl.dismiss();
   }


  //La fonction appeler lors de l'envoie de mon formulaire
  submitForm() {

    //verifie si le formulaire est valide
    if(this.myForm.valid) {

      this.file = this.myForm.controls.fileSource.value;

        const phaseReçu = [
          {
            "libelle":this.myForm.controls.libelle.value,
            "nbrepluies":this.myForm.controls.nbrepluies.value,
            "remarques":this.myForm.controls.remarques.value,
          }
        ]

      const data:FormData=new FormData();
      data.append('file', this.file)
      data.append('phaseReçu', JSON.stringify(phaseReçu).slice(1,JSON.stringify(phaseReçu).lastIndexOf(']')));
      data.append("datedebut", JSON.stringify(this.myForm.controls.datedebut.value).slice(1,JSON.stringify(this.myForm.controls.datedebut.value).lastIndexOf(']')));
      data.append("datefin", JSON.stringify(this.myForm.controls.datefin.value).slice(1,JSON.stringify(this.myForm.controls.datefin.value).lastIndexOf(']')));

          Swal.fire({
            text: 'Etes vous sur d\'ajouter cette action',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Envoyer',
            denyButtonText: `Annuler`,
            heightAuto:false,
            position:'center'
          }).then((result) => {
            if (result.isConfirmed) {         
              this.champService.AjouterPhaseACultive(data, this.idCultiveRecuperer).subscribe(data =>{
                this.resultatAjoutAction = data;
                console.log(data);

                ///si l'ajout de parserelle a marché
                if(this.resultatAjoutAction.status == 1){
                  this.modalCtrl.dismiss(this.resultatAjoutAction);
                  Swal.fire({
                    icon: 'success',
                    text: data.message,
                    timer: 2000,
                    customClass: {
                      container: 'small-text'
                    },

                    heightAuto:false,
                  })
                }else{
                  Swal.fire({
                    icon: 'info',
                    text: data.message,
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
