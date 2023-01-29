import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsChampsPage } from './details-champs.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsChampsPage
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsChampsPageRoutingModule {}
