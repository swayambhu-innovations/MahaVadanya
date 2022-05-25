import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackSentPage } from './feedback-sent.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackSentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackSentPageRoutingModule {}
