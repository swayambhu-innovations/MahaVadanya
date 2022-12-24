import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectedDevicesPageRoutingModule } from './connected-devices-routing.module';

import { ConnectedDevicesPage } from './connected-devices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectedDevicesPageRoutingModule
  ],
  declarations: [ConnectedDevicesPage]
})
export class ConnectedDevicesPageModule {}
