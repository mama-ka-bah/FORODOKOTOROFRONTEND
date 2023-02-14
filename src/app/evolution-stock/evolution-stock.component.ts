import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-evolution-stock',
  templateUrl: './evolution-stock.component.html',
  styleUrls: ['./evolution-stock.component.scss'],
})
export class EvolutionStockComponent implements OnInit {

  evolutionStock:any
  idStock: any;
  affiche:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private stockService: StocksService,
    private navParams: NavParams,

    ) { 
      this.idStock = this.navParams.get('data');
      this.recuperLesEvolutionDunStock();

    }

  ngOnInit() {
   this.recuperLesEvolutionDunStock();

  }

  ionViewDidEnter(){
    
     
  }

  //cette fonction permet de fermer le modal
  async closeModal() {
    await this.modalCtrl.dismiss();
   }

   recuperLesEvolutionDunStock(){
    this.stockService.recupererTousevolutionStocksDunStocks(this.idStock).subscribe(data =>{
      this.evolutionStock = data;
      if(this.evolutionStock.length > 0){
        this.affiche = true
      }else{
        this.affiche = false;
      }
    })
  }
     
  

}
