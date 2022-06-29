import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSlotsPage } from './book-slots.page';

const routes: Routes = [
  {
    path: '',
    component: BookSlotsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSlotsPageRoutingModule {}
