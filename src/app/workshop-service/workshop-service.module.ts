import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkshopServicePageRoutingModule } from './workshop-service-routing.module';

import { WorkshopServicePage } from './workshop-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkshopServicePageRoutingModule
  ],
  declarations: []
})
export class WorkshopServicePageModule {}
