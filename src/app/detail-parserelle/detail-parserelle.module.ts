import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailParserellePageRoutingModule } from './detail-parserelle-routing.module';

import { DetailParserellePage } from './detail-parserelle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailParserellePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailParserellePage]
})
export class DetailParserellePageModule {}
