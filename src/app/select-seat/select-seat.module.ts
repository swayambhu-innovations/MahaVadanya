import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectSeatPageRoutingModule } from './select-seat-routing.module';

import { SelectSeatPage } from './select-seat.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectSeatPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [SelectSeatPage]
})
export class SelectSeatPageModule {}
