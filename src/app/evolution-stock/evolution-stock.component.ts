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
  affiche:boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private stockService: StocksService,
    private navParams: NavParams,

    ) { 
      this.idStock = this.navParams.get('data');
    }

  ngOnInit() {
   this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.recuperLesEvolutionDunStock();
  }

  //cette fonction permet de fermer le modal
  async closeModal() {
    await this.modalCtrl.dismiss();
   }

   recuperLesEvolutionDunStock(){
    this.stockService.recupererTousevolutionStocksDunStocks(this.idStock).subscribe(data =>{
      this.evolutionStock = data;
    })

    setTimeout(() => {
      console.log(this.evolutionStock.length)
      if(this.evolutionStock.length == 0){
        this.affiche == false;
      }
    }, 1000);
  }
     
  

}
