import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { DevenirAgriculteurComponent } from '../devenir-agriculteur/devenir-agriculteur.component';
import { EvolutionStockComponent } from '../evolution-stock/evolution-stock.component';
import { MettreAjourStockComponent } from '../mettre-ajour-stock/mettre-ajour-stock.component';
import { AgriculteurService } from '../services/agriculteur.service';
import { ChampService } from '../services/champ.service';
import { DonneesStockerService } from '../services/donnees-stocker.service';
import { MeteoService } from '../services/meteo.service';
import { StorageService } from '../services/stockage.service';
import { StocksService } from '../services/stocks.service';
import { CallNumber } from '@ionic-native/call-number/ngx';



@Component({
  selector: 'app-detail-stocks',
  templateUrl: './detail-stocks.page.html',
  styleUrls: ['./detail-stocks.page.scss'],
})
export class DetailStocksPage implements OnInit {

  idStockActuel:any;
  tousLesStocksDunUserActuel:any;
  currentUser:any;
  listeAimeStock:any[] = [{id:0, status:false}];
  statusAime:boolean = false;
  statusNonAime:boolean = false;
  nonAime: boolean = true;
  

  constructor(
    private routes : ActivatedRoute,
    private router : Router,
    private storageService : StorageService,
    private navCtrl: NavController,
    private donneesService: DonneesStockerService,
    private modalCtrl: ModalController,
    private agriculteurService: AgriculteurService,
    public popoverController: PopoverController,
    private champService: ChampService,
    private meteoservice: MeteoService,
    private stockService: StocksService,
    private callNumber: CallNumber
  ) { 
   
    
  }

  date = new Date();
  formattedDate = this.date.toLocaleDateString();

  detailsStocks= {
      id:0,
      libelle:"",
      prixkilo:0,
      nombrekilo:0,
      quantiterestant:0,
      nombreaime:0,
      nombrenonaime:0,
      photo:"",
      disponibilite:false,
      datepublication:this.formattedDate,
      varietes:{},
      proprietaire:{
        "id":0,
        "username":"",
        "email":"",
        "nomcomplet":"",
        "adresse":""
      }
  }



  async appelle(phoneNumber: string) {
    const result = await Swal.fire({
      text: 'Vous êtes sur le point d\'appeler cet agriculteur',
      showDenyButton: true,
      confirmButtonText: 'Appeler',
      denyButtonText: `Annuler`,
      heightAuto:false,
      position:'center'
    });
    
    if (result.isConfirmed) {    
      this.callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));            
    }
  }


    //pour retourner en arriere
retourner() {
  this.navCtrl.back();
}



ngOnInit() {
  this.currentUser = this.storageService.getUser();
  this.idStockActuel = this.routes.snapshot.params['id'];
  //this.recupererListeAimesDunStock();
  this.verifierSiUserAaimerUnstock();
  this.recupererDetailStock();
}


  recupererDetailStock(){
    this.stockService.recupererStockParId(this.idStockActuel).subscribe(data =>{
      this.detailsStocks = data;
    })
  }


  verifierSiUserAaimerUnstock(){
    this.recupererListeAimesDunStock();

    setTimeout(() => {
      
      for (let i = 0; i < this.listeAimeStock.length; i++) {
    
        const elementAimeActuel = this.listeAimeStock[i];
        console.log(" element: " +this.listeAimeStock[i].id)
        
        if(elementAimeActuel.id == this.currentUser.id){

          this.nonAime = false;

          if(elementAimeActuel.status == true){
            this.statusAime = true;
            this.statusNonAime = false;
       
          }else if(elementAimeActuel.status == false){
            this.statusAime = false;
            this.statusNonAime = true;
          }
        }else if(elementAimeActuel.id != this.currentUser.id){
          this.nonAime = true;
          // alert("je ssuis rentré 1")
          this.statusAime = false;
          this.statusNonAime = false;
        }
        
      }

      if(this.nonAime == true){
        this.statusAime = false;
        this.statusNonAime = false;
      }
    
    }, 1000);


  }

  recupererListeAimesDunStock(){
    this.stockService.recupererListeAimesDunStock(this.idStockActuel).toPromise().then(data =>{
      this.listeAimeStock = data;
      console.log(data);
    })
  }


  aimerUnStock(valeurAime:any){
    const aimes = {
      "aime":valeurAime
    }

    this.stockService.aimerUnstock(this.idStockActuel, this.currentUser.id, aimes).subscribe(data =>{
      this.detailsStocks = data;
      console.log(data)
      this.verifierSiUserAaimerUnstock();
    })

    // this.recupererDetailStock();
    //this.recupererListeAimesDunStock();
   

  }



  // Cette methode est utiliser pour creer un modal, on peut lui passer
    //  des parametres et il peut également recuperer des données envoyer par le composant 
    async evolutionStock() {
      const modal = await this.modalCtrl.create({
  
        //le composant contenant le modal
        component: EvolutionStockComponent,
  
        //Ici on envoi l'objet myData au composant
        componentProps: {
          data: this.idStockActuel,
    }
      });
  
      //Cette methode contient les 
      modal.onDidDismiss().then((emailSaisie) => {
      })
      await modal.present();
    }


     //popup
     async mettreAjourSonStock(ev: any) {
      const popover = await this.popoverController.create({
        component: MettreAjourStockComponent,
        event: ev,
        translucent: true,
        componentProps: {
          data: this.idStockActuel,
          data1:this.detailsStocks
        }
      });

      await popover.present();
  
      popover.onDidDismiss().then((data) => {
        console.log(data.data);
     })

    }

    

}
