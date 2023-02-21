import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams, NavController, ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { CommunauteService } from '../services/communaute.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-modifier-commentaire',
  templateUrl: './modifier-commentaire.component.html',
  styleUrls: ['./modifier-commentaire.component.scss'],
})
export class ModifierCommentaireComponent implements OnInit {

  commentaireRecuperer:any;
  erreur:boolean | undefined;
  resultatAjoutCommentaire: any;
  currentUser:any;
  myForm:any;


  constructor(
    private routes : ActivatedRoute,
    private router : Router,
    private navParams: NavParams,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private meteoservice: MeteoService,
    private stockService: StocksService,
    private communauteService: CommunauteService
  ) {
      //ici je recuperere ces données dans envoyer au modal()  
      this.commentaireRecuperer = this.navParams.get('data');
      
       //l'objet form froup lié à mon formulaire dans le template
    this.myForm = new FormGroup({
      description: new FormControl(this.commentaireRecuperer.description, [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
      lien: new FormControl(this.commentaireRecuperer.lien,  [Validators.minLength(5), Validators.maxLength(160)]),
    });
  }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
  }

  closePopover() {
    this.popoverController.dismiss();
  }


   //La fonction appeler lors de l'envoie de mon formulaire
   submitForm() {

    //verifie si le formulaire est valide
    if(this.myForm.valid) {

      const commentaireAEnvoyer = {
        "description":this.myForm.controls.description.value,
        "lien":this.myForm.controls.lien.value
      }

        
        
          // Fermer le modal et retourner les données du formulaire à notre page
          Swal.fire({
            text: 'Ce commentaire sera modifié',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Modifier',
            denyButtonText: `Annuler`,
            heightAuto:false,
            position:'center'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {         
              this.communauteService.modifierCommentaire(this.commentaireRecuperer.id, commentaireAEnvoyer).subscribe(data =>{
                this.resultatAjoutCommentaire = data;
                // console.log(data);

                ///si l'ajout du champ a marché
                if(this.resultatAjoutCommentaire.status == 1){
                  this.modalCtrl.dismiss(this.resultatAjoutCommentaire);
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
                  this.closePopover()
                 // this.router.navigate(['/detail-publication', this.commentaireRecuperer.id]);
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

}
