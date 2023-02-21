import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Platform } from '@ionic/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { InputotpComponent } from './inputotp/inputotp.component';
import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ChoisirProfilComponent } from './choisir-profil/choisir-profil.component';
import { DevenirTransporteurComponent } from './devenir-transporteur/devenir-transporteur.component';
import { AjouterChampComponent } from './ajouter-champ/ajouter-champ.component';
import { DevenirAgriculteurComponent } from './devenir-agriculteur/devenir-agriculteur.component';
import { AjouterParserelleComponent } from './ajouter-parserelle/ajouter-parserelle.component';
import { CultureParserelleComponent } from './culture-parserelle/culture-parserelle.component';
import { AjouterPhaseCultiveComponent } from './ajouter-phase-cultive/ajouter-phase-cultive.component';
import { DetailPhaseCultiveComponent } from './detail-phase-cultive/detail-phase-cultive.component';
import { ModifierProfilComponent } from './modifier-profil/modifier-profil.component';
import { AjouterStockComponent } from './ajouter-stock/ajouter-stock.component';
import { MettreAjourStockComponent } from './mettre-ajour-stock/mettre-ajour-stock.component';
import { EvolutionStockComponent } from './evolution-stock/evolution-stock.component';
import { DetailNotificationComponent } from './detail-notification/detail-notification.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AjoutConseilComponent } from './ajout-conseil/ajout-conseil.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { ModifierPublicationComponent } from './modifier-publication/modifier-publication.component';
import { ModifierCommentaireComponent } from './modifier-commentaire/modifier-commentaire.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

  @NgModule({
    declarations: [AppComponent,OtpComponent,InputotpComponent, ChangerMotDePasseComponent, ChoisirProfilComponent,
       DevenirTransporteurComponent, DevenirAgriculteurComponent, AjouterChampComponent, AjouterParserelleComponent,
      CultureParserelleComponent, AjouterPhaseCultiveComponent, DetailPhaseCultiveComponent,ModifierProfilComponent,
       AjouterStockComponent, MettreAjourStockComponent, EvolutionStockComponent, DetailNotificationComponent,
       AjoutConseilComponent, CommentairesComponent, ModifierPublicationComponent, ModifierCommentaireComponent],

    imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      MatSlideToggleModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      Ng2SearchPipeModule,
      NgxPaginationModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    }, Platform, httpInterceptorProviders, CallNumber],
    //httpInterceptorProviders
    bootstrap: [AppComponent],
  })
  export class AppModule {}
