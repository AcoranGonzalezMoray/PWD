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
import { AppWorkshopStoreComponent } from './app-workshop-store/app-workshop-store.component';
import { AppWorkshopServiceComponent } from './app-workshop-service/app-workshop-service.component';
import { AppWhatWeDoComponent } from './app-what-we-do/app-what-we-do.component';
import { AppStoreComponent } from './app-store/app-store.component';
import { AppSignUpComponent } from './app-sign-up/app-sign-up.component';
import { AppSignInComponent } from './app-sign-in/app-sign-in.component';
import { AppDashboardAdminComponent } from './app-dashboard-admin/app-dashboard-admin.component';
import { AppDashboardUserComponent } from './app-dashboard-user/app-dashboard-user.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

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
    LoadingScreenComponent,
    AppWorkshopStoreComponent,
    AppWorkshopServiceComponent,
    AppWhatWeDoComponent,
    AppStoreComponent,
    AppSignUpComponent,
    AppSignInComponent,
    AppDashboardAdminComponent,
    AppDashboardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
