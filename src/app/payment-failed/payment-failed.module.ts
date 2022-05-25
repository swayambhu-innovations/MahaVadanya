import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentFailedPageRoutingModule } from './payment-failed-routing.module';

import { PaymentFailedPage } from './payment-failed.page';
import { BaseComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentFailedPageRoutingModule,
    BaseComponentsModule,
    RouterModule
  ],
  declarations: [PaymentFailedPage]
})
export class PaymentFailedPageModule {}
