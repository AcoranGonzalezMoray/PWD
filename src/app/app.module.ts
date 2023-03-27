import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ReserveBoxComponent } from './reserve-box/reserve-box.component';
import { SocialComponent } from './social/social.component';
import { ReserveBoxItemComponent } from './reserve-box-item/reserve-box-item.component';
import { AsideComponent } from './aside/aside.component';
import { HeaderLogComponent } from './header-log/header-log.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AsideCheckBoxComponent } from './aside-check-box/aside-check-box.component';
import { CategoryAsideComponent } from './category-aside/category-aside.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { RouterModule } from '@angular/router';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProductComponent,
    ReserveBoxComponent,
    SocialComponent,
    ReserveBoxItemComponent,
    AsideComponent,
    HeaderLogComponent,
    HeaderComponent,
    CarouselComponent,
    AsideCheckBoxComponent,
    CategoryAsideComponent,
    CartProductComponent,
    AppHomeComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: AppHomeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
