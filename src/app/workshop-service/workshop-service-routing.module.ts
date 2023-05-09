import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkshopServicePage } from './workshop-service.page';

const routes: Routes = [
  {
    path: '',
    component: WorkshopServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopServicePageRoutingModule {}
