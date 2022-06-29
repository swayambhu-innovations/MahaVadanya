import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'book-slots',
        pathMatch: 'full',
      },
      {
        path: 'book-slots',
        loadChildren: () =>
          import('./book-slots/book-slots.module').then(
            (m) => m.BookSlotsPageModule
          ),
      },
      {
        path: 'ongoing-session',
        loadChildren: () =>
          import('./ongoing-session/ongoing-session.module').then(
            (m) => m.OngoingSessionPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
