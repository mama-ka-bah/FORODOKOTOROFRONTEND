import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampsPage } from './champs.page';

const routes: Routes = [
  {
    path: '',
    component: ChampsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChampsPageRoutingModule {}
