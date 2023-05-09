import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkshopStorePage } from './workshop-store.page';

const routes: Routes = [
  {
    path: '',
    component: WorkshopStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopStorePageRoutingModule {}
