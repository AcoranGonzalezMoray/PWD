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
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import { CartProductComponent } from "./cart-product/cart-product.component";

@NgModule({
  declarations: [AppComponent, CarouselComponent, HeaderComponent, HeaderLogComponent, HomePage, SocialComponent, FooterComponent,
  CartProductComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
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
