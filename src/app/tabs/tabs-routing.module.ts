import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'produit-agricoles',
        loadChildren: () => import('../produit-agricoles/produit-agricoles.module').then( m => m.ProduitAgricolesPageModule),
        canActivate: [AuthGuard]
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
        loadChildren: () => import('../transporteurs/transporteurs.module').then( m => m.TransporteursPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'marche',
        loadChildren: () => import('../marche/marche.module').then( m => m.MarchePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'communautes',
        loadChildren: () => import('../communautes/communautes.module').then( m => m.CommunautesPageModule),
        canActivate: [AuthGuard]
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
