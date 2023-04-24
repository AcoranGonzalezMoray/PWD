import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppSignInComponent } from './app-sign-in/app-sign-in.component';
import { AppSignUpComponent } from './app-sign-up/app-sign-up.component';
import { AppStoreComponent } from './app-store/app-store.component';
import { AppWhatWeDoComponent } from './app-what-we-do/app-what-we-do.component';
import { AppWorkshopServiceComponent } from './app-workshop-service/app-workshop-service.component';
import { AppWorkshopStoreComponent } from './app-workshop-store/app-workshop-store.component';
import { AppDashboardUserComponent } from './app-dashboard-user/app-dashboard-user.component';
import { AppDashboardAdminComponent } from './app-dashboard-admin/app-dashboard-admin.component';
import {CalendarComponent} from './calendar/calendar.component'
const routes: Routes = [
  {path: '', component: AppHomeComponent},
  {path: 'quehacemos', component: AppWhatWeDoComponent},
  {path: 'tienda-taller', component: AppWorkshopStoreComponent},
  {path: 'tienda', component: AppStoreComponent},
  {path: 'servicios-taller', component: AppWorkshopServiceComponent},
  {path: 'iniciar-sesion', component: AppSignInComponent},
  {path: 'registrarse', component: AppSignUpComponent},
  {path: 'dashboard', component: AppDashboardUserComponent},
  {path: 'dashboardAdmin', component: AppDashboardAdminComponent},
  {path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
