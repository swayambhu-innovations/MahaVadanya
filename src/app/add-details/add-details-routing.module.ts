import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetailsPage } from './add-details.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetailsPageRoutingModule {}
