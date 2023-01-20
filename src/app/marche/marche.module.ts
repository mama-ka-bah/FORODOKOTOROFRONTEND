import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarchePageRoutingModule } from './marche-routing.module';

import { MarchePage } from './marche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarchePageRoutingModule
  ],
  declarations: [MarchePage]
})
export class MarchePageModule {}
