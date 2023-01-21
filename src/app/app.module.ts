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







@NgModule({
  declarations: [AppComponent,OtpComponent,InputotpComponent],
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
  bootstrap: [AppComponent],
})
export class AppModule {}
