import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-mettre-ajour-stock',
  templateUrl: './mettre-ajour-stock.component.html',
  styleUrls: ['./mettre-ajour-stock.component.scss'],
})
export class MettreAjourStockComponent implements OnInit {

  myForm:any
  idStock: any;
  resultatMiseAJour: any;
  detailStock:any

  //utiliser pour stocker la valeur actu
  quantiterestant!:number;

  constructor(
    public popoverController: PopoverController,
    private stockService: StocksService,
    private navParams: NavParams,
    ) {

    //ici je recuperere ces données dans mondata  
    this.idStock = this.navParams.get('data');
    this.detailStock = this.navParams.get('data1');
    // console.log("donnée: " + this.idStock);

    this.quantiterestant = this.detailStock.quantiterestant;

     //l'objet form froup lié à mon formulaire dans le template
   this.myForm = new FormGroup({
    nombrekiloaajouter: new FormControl(0,  [Validators.required, Validators.min(0), Validators.max(10000000)]),
    nombrekiloaenlever: new FormControl(0,  [Validators.required, Validators.min(0), Validators.max(10000000)]),
    motif: new FormControl("",  [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    quantiterestant: new FormControl(this.quantiterestant,  [Validators.required, Validators.min(0), Validators.max(10000000), Validators.pattern(/^[0-9]+$/)])
});


   }

  

submitForm(){

  const quantiterestant = this.quantiterestant;

  const evolutionStock = {
    "quantiteajoute": this.myForm.controls['nombrekiloaajouter'].value,
    "quantitededuit": this.myForm.controls['nombrekiloaenlever'].value,
    "motif": this.myForm.controls['motif'].value,
    "quantiterestant": this.quantiterestant
  };

  if(this.myForm.valid){

    if(this.quantiterestant < 0){
      Swal.fire({
        icon: 'info',
        text: "Stock insuffisant",
        showConfirmButton: true,
        // timer: 2000,
        heightAuto:false,
      })
    }else{

   
              // Fermer le modal et retourner les données du formulaire à notre page
              Swal.fire({
                text: 'Etes vous sur d\'enregistrer cette mise à jour',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: 'Enregistrer',
                denyButtonText: `Annuler`,
                heightAuto:false,
                position:'center'
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {         
                 this.stockService.mettreAjourStock(this.idStock, quantiterestant, evolutionStock).subscribe(data => {
                  this.resultatMiseAJour = data
                    ///si l'ajout du champ a marché
                    if(this.resultatMiseAJour.status == 1){
                     // this.router.navigateByUrl("/profil/champs");
                    // this.router.navigate(['/profil/champs']);
                      this.popoverController.dismiss();
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
                     
                    }else{
                      Swal.fire({
                        icon: 'info',
                        text: "Echec",
                        showConfirmButton: true,
                        // timer: 2000,
                        heightAuto:false,
                      })
                    }
                    
                  })                
                } 
              })
            }

  }

}


  ngOnInit() {

    //on calul la valeur de la quantité restante de partir des changement dans le formulaire
  this.myForm.valueChanges.subscribe((formData:any) => {
    this.quantiterestant = formData.quantiterestant + formData.nombrekiloaajouter - formData.nombrekiloaenlever;
  });

  }

  closePopover() {
    this.popoverController.dismiss();
  }
 

}
