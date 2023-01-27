import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampsPage } from './champs.page';

const routes: Routes = [
  {
    path: '',
    component: ChampsPage
  },
  {
    path: 'details-champs/:id',
    loadChildren: () => import('../details-champs/details-champs.module').then( m => m.DetailsChampsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChampsPageRoutingModule {}
