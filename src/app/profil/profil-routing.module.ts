import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilPage } from './profil.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPage,
    children: [
      {
        path: 'champs',
        loadChildren: () => import('../champs/champs.module').then( m => m.ChampsPageModule)
      },

      {
        path: '',
        redirectTo: '/profil/champs',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/profil/champs',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilPageRoutingModule {}
