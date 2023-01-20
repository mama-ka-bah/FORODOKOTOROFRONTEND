import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransporteursPageRoutingModule } from './transporteurs-routing.module';

import { TransporteursPage } from './transporteurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransporteursPageRoutingModule
  ],
  declarations: [TransporteursPage]
})
export class TransporteursPageModule {}
