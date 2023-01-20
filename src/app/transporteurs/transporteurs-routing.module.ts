import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransporteursPage } from './transporteurs.page';

const routes: Routes = [
  {
    path: '',
    component: TransporteursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporteursPageRoutingModule {}
