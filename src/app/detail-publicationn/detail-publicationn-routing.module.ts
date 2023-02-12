import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPublicationnPage } from './detail-publicationn.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPublicationnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPublicationnPageRoutingModule {}
