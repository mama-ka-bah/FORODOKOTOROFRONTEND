import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'produit-agricoles',
        loadChildren: () => import('../produit-agricoles/produit-agricoles.module').then( m => m.ProduitAgricolesPageModule)
      },
      // {
      //   path: 'tab2',
      //   loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      // },
      // {
      //   path: 'tab3',
      //   loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      // },
      {
        path: 'transporteurs',
        loadChildren: () => import('../transporteurs/transporteurs.module').then( m => m.TransporteursPageModule)
      },
      {
        path: 'marche',
        loadChildren: () => import('../marche/marche.module').then( m => m.MarchePageModule)
      },
      {
        path: 'communautes',
        loadChildren: () => import('../communautes/communautes.module').then( m => m.CommunautesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
