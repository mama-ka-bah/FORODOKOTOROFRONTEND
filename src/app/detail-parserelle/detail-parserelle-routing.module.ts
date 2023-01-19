import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailParserellePage } from './detail-parserelle.page';

const routes: Routes = [
  {
    path: '',
    component: DetailParserellePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailParserellePageRoutingModule {}
