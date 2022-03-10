import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InactiveSevaPage } from './Inactiveseva.page';

const routes: Routes = [
  {
    path: ':id',
    component: InactiveSevaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InactivesevaPageRoutingModule {}
