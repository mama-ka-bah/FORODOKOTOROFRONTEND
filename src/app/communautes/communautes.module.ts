import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunautesPageRoutingModule } from './communautes-routing.module';

import { CommunautesPage } from './communautes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunautesPageRoutingModule
  ],
  declarations: [CommunautesPage]
})
export class CommunautesPageModule {}
