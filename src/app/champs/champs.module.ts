import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChampsPageRoutingModule } from './champs-routing.module';

import { ChampsPage } from './champs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChampsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChampsPage]
})
export class ChampsPageModule {}
