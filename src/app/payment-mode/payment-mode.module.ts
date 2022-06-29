import { WidgetsModule } from './../widgets/widgets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentModePageRoutingModule } from './payment-mode-routing.module';

import { PaymentModePage } from './payment-mode.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentModePageRoutingModule,
    BaseComponentsModule,
    WidgetsModule
  ],
  declarations: [PaymentModePage]
})
export class PaymentModePageModule {}
