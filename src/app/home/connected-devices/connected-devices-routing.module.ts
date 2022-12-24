import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectedDevicesPage } from './connected-devices.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectedDevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectedDevicesPageRoutingModule {}
