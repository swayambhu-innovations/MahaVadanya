import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeSeatPageRoutingModule } from './exchange-seat-routing.module';

import { ExchangeSeatPage } from './exchange-seat.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeSeatPageRoutingModule,
    BaseComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ExchangeSeatPage]
})
export class ExchangeSeatPageModule {}
