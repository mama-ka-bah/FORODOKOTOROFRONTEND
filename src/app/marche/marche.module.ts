import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarchePageRoutingModule } from './marche-routing.module';

import { MarchePage } from './marche.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarchePageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [MarchePage]
})
export class MarchePageModule {}
