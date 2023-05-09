import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'what-we-do',
    loadChildren: () => import('./what-we-do/what-we-do.module').then( m => m.WhatWeDoPageModule)
  },
  {
    path: 'workshop-service',
    loadChildren: () => import('./workshop-service/workshop-service.module').then( m => m.WorkshopServicePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
