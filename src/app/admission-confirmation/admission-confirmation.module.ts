import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmissionConfirmationPageRoutingModule } from './admission-confirmation-routing.module';

import { AdmissionConfirmationPage } from './admission-confirmation.page';
import { BaseComponentsModule } from '../base-components/base-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmissionConfirmationPageRoutingModule,
    BaseComponentsModule
  ],
  declarations: [AdmissionConfirmationPage]
})
export class AdmissionConfirmationPageModule {}
