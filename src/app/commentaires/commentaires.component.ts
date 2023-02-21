import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController, NavParams } from '@ionic/angular';
import Swal from 'sweetalert2';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { CommunauteService } from '../services/communaute.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';


@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.scss'],
})
export class CommentairesComponent implements OnInit {

  idConseilRecuperer:any;
  erreur:boolean | undefined;
  resultatAjoutCommentaire: any;
  currentUser:any;

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
      this.idConseilRecuperer = this.navParams.get('data');
  }

  
    //l'objet form froup lié à mon formulaire dans le template
    myForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
      lien: new FormControl('',  [Validators.minLength(5), Validators.maxLength(160)]),
    });

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

      const commentaire = {
        "description":this.myForm.controls.description.value,
        "lien":this.myForm.controls.lien.value
      }

        
         

          // Fermer le modal et retourner les données du formulaire à notre page
          Swal.fire({
            text: 'Ce commentaire va être ajouté',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Ajouter',
            denyButtonText: `Annuler`,
            heightAuto:false,
            position:'center'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {         
              this.communauteService.ajouterCommentaire(this.currentUser.id, this.idConseilRecuperer, commentaire).subscribe(data =>{
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
                  this.router.navigate(['/detail-publication', this.idConseilRecuperer]);
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
