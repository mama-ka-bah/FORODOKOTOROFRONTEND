  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { RouteReuseStrategy } from '@angular/router';

  import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { Geolocation } from '@capacitor/geolocation';
  import { Platform } from '@ionic/angular';
  import { MatSlideToggleModule } from '@angular/material/slide-toggle';
  import { HttpClientModule } from '@angular/common/http';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { OtpComponent } from './otp/otp.component';
  import { InputotpComponent } from './inputotp/inputotp.component';
  import { ChangerMotDePasseComponent } from './changer-mot-de-passe/changer-mot-de-passe.component';
  import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ChoisirProfilComponent } from './choisir-profil/choisir-profil.component';



  @NgModule({
    declarations: [AppComponent,OtpComponent,InputotpComponent,ChangerMotDePasseComponent, ChoisirProfilComponent],
    imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      MatSlideToggleModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    }, Platform],
    //httpInterceptorProviders
    bootstrap: [AppComponent],
  })
  export class AppModule {}
