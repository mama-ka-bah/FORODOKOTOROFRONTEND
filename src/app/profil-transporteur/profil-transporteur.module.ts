import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilTransporteurPageRoutingModule } from './profil-transporteur-routing.module';

import { ProfilTransporteurPage } from './profil-transporteur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilTransporteurPageRoutingModule
  ],
  declarations: [ProfilTransporteurPage]
})
export class ProfilTransporteurPageModule {}
