import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProduitAgricolesPage } from './detail-produit-agricoles.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProduitAgricolesPage
  },
  {
    path: 'semence/:idvariete',
    loadChildren: () => import('../semence/semence.module').then( m => m.SemencePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProduitAgricolesPageRoutingModule {}
