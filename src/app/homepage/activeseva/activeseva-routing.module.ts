import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivesevaPage } from './activeseva.page';

const routes: Routes = [
  {
    path: ':id',
    component: ActivesevaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivesevaPageRoutingModule {}
