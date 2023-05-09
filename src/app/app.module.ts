import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { CarouselComponent} from "./carousel/carousel.component";
import { HeaderComponent} from "./header/header.component";
import { HeaderLogComponent } from "./header-log/header-log.component";
import { HomePage } from "./home/home.page";
import { SocialComponent } from "./social/social.component";
import { FooterComponent } from "./footer/footer.component";
import { WhatWeDoPage } from './what-we-do/what-we-do.page';
import { WorkshopServicePage } from './workshop-service/workshop-service.page';
import { AsideCheckBoxComponent } from './aside-check-box/aside-check-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'

import { CartProductComponent } from "./cart-product/cart-product.component";

import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [AppComponent,
    SocialComponent,
    HeaderComponent,
    HeaderLogComponent,
    FooterComponent,
    CarouselComponent,
    CalendarComponent,
    AsideCheckBoxComponent,
    WhatWeDoPage,
    WorkshopServicePage,
    HomePage,
    CartProductComponent
  ],

  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
