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
  },
  {
    path: 'what-we-do',
    loadChildren: () => import('./what-we-do/what-we-do.module').then( m => m.WhatWeDoPageModule)
  },
  {
    path: 'workshop-service',
    loadChildren: () => import('./workshop-service/workshop-service.module').then( m => m.WorkshopServicePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },  {
    path: 'workshop-store',
    loadChildren: () => import('./workshop-store/workshop-store.module').then( m => m.WorkshopStorePageModule)
  },
  {
    path: 'dashboard-user',
    loadChildren: () => import('./dashboard-user/dashboard-user.module').then( m => m.DashboardUserPageModule)
  },
  {
    path: 'dashboard-admin',
    loadChildren: () => import('./dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
