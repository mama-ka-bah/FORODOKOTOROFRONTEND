import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransporteursPageRoutingModule } from './transporteurs-routing.module';

import { TransporteursPage } from './transporteurs.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransporteursPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [TransporteursPage]
})
export class TransporteursPageModule {}
