import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunautesPageRoutingModule } from './communautes-routing.module';

import { CommunautesPage } from './communautes.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunautesPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [CommunautesPage]
})
export class CommunautesPageModule {}
