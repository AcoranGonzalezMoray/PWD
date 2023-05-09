import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkshopStorePageRoutingModule } from './workshop-store-routing.module';

import { WorkshopStorePage } from './workshop-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkshopStorePageRoutingModule
  ],
  declarations: []
})
export class WorkshopStorePageModule {}
