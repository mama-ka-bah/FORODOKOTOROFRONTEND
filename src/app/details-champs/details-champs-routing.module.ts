import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsChampsPage } from './details-champs.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsChampsPage
  }
  ,
  {
    path: 'detail-parserelle',
    loadChildren: () => import('../detail-parserelle/detail-parserelle.module').then( m => m.DetailParserellePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsChampsPageRoutingModule {}
