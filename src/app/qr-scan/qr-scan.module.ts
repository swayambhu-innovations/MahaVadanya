import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrScanPageRoutingModule } from './qr-scan-routing.module';

import { QrScanPage } from './qr-scan.page';
import { BaseComponentsModule } from '../base-components/base-components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrScanPageRoutingModule,
    BaseComponentsModule
    
  ],
  declarations: [QrScanPage]
})
export class QrScanPageModule {}
