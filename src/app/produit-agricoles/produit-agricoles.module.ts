import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitAgricolesPageRoutingModule } from './produit-agricoles-routing.module';

import { ProduitAgricolesPage } from './produit-agricoles.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProduitAgricolesPageRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule

  ],
  declarations: [ProduitAgricolesPage]
})
export class ProduitAgricolesPageModule {}
