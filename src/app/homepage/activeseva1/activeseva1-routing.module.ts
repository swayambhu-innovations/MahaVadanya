import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Activeseva1Page } from './activeseva1.page';

const routes: Routes = [
  {
    path: '',
    component: Activeseva1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Activeseva1PageRoutingModule {}
