import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeatPlanPageRoutingModule } from './seat-plan-routing.module';

import { SeatPlanPage } from './seat-plan.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeatPlanPageRoutingModule,BaseComponentsModule
  ],
  declarations: [SeatPlanPage]
})
export class SeatPlanPageModule {}
