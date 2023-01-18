import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemencePage } from './semence.page';

const routes: Routes = [
  {
    path: '',
    component: SemencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemencePageRoutingModule {}
