import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessfulPageRoutingModule } from './payment-successful-routing.module';

import { PaymentSuccessfulPage } from './payment-successful.page';
import { BaseComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessfulPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [PaymentSuccessfulPage]
})
export class PaymentSuccessfulPageModule {}
