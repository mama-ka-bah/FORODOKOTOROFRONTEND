import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitAgricolesPage } from './produit-agricoles.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitAgricolesPage
  },
  {
    path: 'detail-produit-agricoles',
    loadChildren: () => import('../detail-produit-agricoles/detail-produit-agricoles.module').then( m => m.DetailProduitAgricolesPageModule)
  },
  {
    path: 'semence',
    loadChildren: () => import('../semence/semence.module').then( m => m.SemencePageModule)
  }
  ,
  {
    path: 'profil',
    loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitAgricolesPageRoutingModule {}
