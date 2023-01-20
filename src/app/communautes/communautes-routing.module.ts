import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunautesPage } from './communautes.page';

const routes: Routes = [
  {
    path: '',
    component: CommunautesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunautesPageRoutingModule {}
