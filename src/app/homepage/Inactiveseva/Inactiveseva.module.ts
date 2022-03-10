import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InactivesevaPageRoutingModule } from './Inactiveseva-routing.module';

import { InactiveSevaPage } from './Inactiveseva.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InactivesevaPageRoutingModule,QRCodeModule
  ],
  declarations: [InactiveSevaPage]
})
export class InactivesevaPageModule {}
