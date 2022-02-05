import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepagePage } from './homepage.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomepagePage,
    children: [
      {
        path: 'bookseva',
        // outlet:'home',
        loadChildren: () => import('./bookseva/bookseva.module').then( m => m.BooksevaPageModule)
        // children:[
        //   {
        //     path:'',

        //   },
        // ]
      },
      {
        path: 'activeseva',
        // outlet:'home',
        loadChildren: () => import('./activeseva/activeseva.module').then( m => m.ActivesevaPageModule)
        // children:[
        //   {
        // path:'',
        //   }
        // ]
      }
    ]
  },
  {
    path:'',
    redirectTo:'home/bookseva',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagePageRoutingModule {}
