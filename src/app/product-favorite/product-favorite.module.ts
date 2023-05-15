import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductFavoritePageRoutingModule } from './product-favorite-routing.module';

import { ProductFavoritePage } from './product-favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFavoritePageRoutingModule
  ],
  declarations: [ProductFavoritePage]
})
export class ProductFavoritePageModule {}
