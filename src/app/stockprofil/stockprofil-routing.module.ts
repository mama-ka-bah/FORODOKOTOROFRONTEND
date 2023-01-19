import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockprofilPage } from './stockprofil.page';

const routes: Routes = [
  {
    path: '',
    component: StockprofilPage
  },
  {
    path: 'detail-stocks',
    loadChildren: () => import('../detail-stocks/detail-stocks.module').then( m => m.DetailStocksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockprofilPageRoutingModule {}
