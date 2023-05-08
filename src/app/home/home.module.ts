import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {HeaderComponent} from "../header/header.component";

import { HomePageRoutingModule } from './home-routing.module';
import {SocialComponent} from "../social/social.component";
import {CarouselComponent} from "../carousel/carousel.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, HeaderComponent, SocialComponent, CarouselComponent]
})
export class HomePageModule {}
