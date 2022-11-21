import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmissionConfirmationPage } from './admission-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: AdmissionConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmissionConfirmationPageRoutingModule {}
