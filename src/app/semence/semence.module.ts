import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemencePageRoutingModule } from './semence-routing.module';

import { SemencePage } from './semence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemencePageRoutingModule
  ],
  declarations: [SemencePage]
})
export class SemencePageModule {}
