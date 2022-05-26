import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngoingSessionPage } from './ongoing-session.page';

const routes: Routes = [
  {
    path: '',
    component: OngoingSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngoingSessionPageRoutingModule {}
