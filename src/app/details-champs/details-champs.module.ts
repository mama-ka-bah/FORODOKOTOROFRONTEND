import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsChampsPageRoutingModule } from './details-champs-routing.module';

import { DetailsChampsPage } from './details-champs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsChampsPageRoutingModule
  ],
  declarations: [DetailsChampsPage]
})
export class DetailsChampsPageModule {}
