import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailStocksPageRoutingModule } from './detail-stocks-routing.module';

import { DetailStocksPage } from './detail-stocks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailStocksPageRoutingModule
  ],
  declarations: [DetailStocksPage]
})
export class DetailStocksPageModule {}
