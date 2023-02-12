import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPublicationnPageRoutingModule } from './detail-publicationn-routing.module';

import { DetailPublicationnPage } from './detail-publicationn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPublicationnPageRoutingModule
  ],
  declarations: [DetailPublicationnPage]
})
export class DetailPublicationnPageModule {}
