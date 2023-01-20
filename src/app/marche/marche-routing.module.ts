import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarchePage } from './marche.page';

const routes: Routes = [
  {
    path: '',
    component: MarchePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarchePageRoutingModule {}
