import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionEndedPage } from './session-ended.page';

const routes: Routes = [
  {
    path: '',
    component: SessionEndedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionEndedPageRoutingModule {}
