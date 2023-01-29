import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BienvenuePage } from './bienvenue/bienvenue.page';
import { AuthGuard } from './services/auth.guard';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: 'bienvenue', component: BienvenuePage, canActivate: [AuthGuard],
    loadChildren: () => import('./bienvenue/bienvenue.module').then( m => m.BienvenuePageModule)
  },

  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'detail-produit-agricoles',
    loadChildren: () => import('./detail-produit-agricoles/detail-produit-agricoles.module').then( m => m.DetailProduitAgricolesPageModule),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'champs',
    loadChildren: () => import('./champs/champs.module').then( m => m.ChampsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profil-transporteur',
    loadChildren: () => import('./profil-transporteur/profil-transporteur.module').then( m => m.ProfilTransporteurPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-parserelle',
    loadChildren: () => import('./detail-parserelle/detail-parserelle.module').then( m => m.DetailParserellePageModule)
  }


  // ,
  // {
  //   path: 'detail-stock',
  //   loadChildren: () => import('./detail-stock/detail-stock.module').then( m => m.DetailStockPageModule)
  // }

  // ,
  // {
  //   path: 'communautes',
  //   loadChildren: () => import('./communautes/communautes.module').then( m => m.CommunautesPageModule)
  // }

  // ,
  // {
  //   path: 'transporteurs',
  //   loadChildren: () => import('./transporteurs/transporteurs.module').then( m => m.TransporteursPageModule)
  // },
  // {
  //   path: 'marche',
  //   loadChildren: () => import('./marche/marche.module').then( m => m.MarchePageModule)
  // }

  // ,
  // {
  //   path: 'detail-parserelle',
  //   loadChildren: () => import('./detail-parserelle/detail-parserelle.module').then( m => m.DetailParserellePageModule)
  // }

  // ,
  // {
  //   path: 'detail-stocks',
  //   loadChildren: () => import('./detail-stocks/detail-stocks.module').then( m => m.DetailStocksPageModule)
  // }

  //,
  // {
  //   path: 'details-champs',
  //   loadChildren: () => import('./details-champs/details-champs.module').then( m => m.DetailsChampsPageModule)
  // }

  //,
  // {
  //   path: 'stockprofil',
  //   loadChildren: () => import('./stockprofil/stockprofil.module').then( m => m.StockprofilPageModule)
  // }

  // {
  //   path: 'semence',
  //   loadChildren: () => import('./semence/semence.module').then( m => m.SemencePageModule)
  // },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
