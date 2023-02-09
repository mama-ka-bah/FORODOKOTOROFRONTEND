import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockprofilPageRoutingModule } from './stockprofil-routing.module';

import { StockprofilPage } from './stockprofil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockprofilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StockprofilPage]
})
export class StockprofilPageModule {}
