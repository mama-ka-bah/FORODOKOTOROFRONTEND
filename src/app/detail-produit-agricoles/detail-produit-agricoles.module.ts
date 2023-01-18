import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProduitAgricolesPageRoutingModule } from './detail-produit-agricoles-routing.module';

import { DetailProduitAgricolesPage } from './detail-produit-agricoles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProduitAgricolesPageRoutingModule
  ],
  declarations: [DetailProduitAgricolesPage]
})
export class DetailProduitAgricolesPageModule {}
