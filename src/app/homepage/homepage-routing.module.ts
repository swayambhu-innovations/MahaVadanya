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
        path: 'Inactiveseva',
        // outlet:'home',
        loadChildren: () => import('./Inactiveseva/Inactiveseva.module').then( m => m.InactivesevaPageModule)
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
  },
  {
    path: 'activeseva1',
    loadChildren: () => import('./activeseva/activeseva.module').then( m => m.ActivesevaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepagePageRoutingModule {}
