import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeSeatPage } from './exchange-seat.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeSeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeSeatPageRoutingModule {}
