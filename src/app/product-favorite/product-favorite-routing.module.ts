import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductFavoritePage } from './product-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: ProductFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductFavoritePageRoutingModule {}
