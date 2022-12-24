import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { PaymentDetailsPage } from './payment-details.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailsPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [PaymentDetailsPage]
})
export class PaymentDetailsPageModule {}
