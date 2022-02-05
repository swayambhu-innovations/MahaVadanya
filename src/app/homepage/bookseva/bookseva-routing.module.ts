import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksevaPage } from './bookseva.page';

const routes: Routes = [
  {
    path: '',
    component: BooksevaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksevaPageRoutingModule {}
