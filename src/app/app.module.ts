import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MatSlideToggleModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  }, Platform],
  bootstrap: [AppComponent],
})
export class AppModule {}
