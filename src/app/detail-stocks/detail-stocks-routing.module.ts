import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailStocksPage } from './detail-stocks.page';

const routes: Routes = [
  {
    path: '',
    component: DetailStocksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailStocksPageRoutingModule {}
