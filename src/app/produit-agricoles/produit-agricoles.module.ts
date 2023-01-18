import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitAgricolesPageRoutingModule } from './produit-agricoles-routing.module';

import { ProduitAgricolesPage } from './produit-agricoles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitAgricolesPageRoutingModule
  ],
  declarations: [ProduitAgricolesPage]
})
export class ProduitAgricolesPageModule {}
