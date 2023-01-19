import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilTransporteurPage } from './profil-transporteur.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilTransporteurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilTransporteurPageRoutingModule {}
