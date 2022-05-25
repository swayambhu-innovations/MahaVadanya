import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'add-details',
    loadChildren: () => import('./add-details/add-details.module').then( m => m.AddDetailsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'seat-plan',
    loadChildren: () => import('./seat-plan/seat-plan.module').then( m => m.SeatPlanPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'feedback-sent',
    loadChildren: () => import('./feedback-sent/feedback-sent.module').then( m => m.FeedbackSentPageModule)
  },
  {
    path: 'payment-mode',
    loadChildren: () => import('./payment-mode/payment-mode.module').then( m => m.PaymentModePageModule)
  },
  {
    path: 'payment-successful',
    loadChildren: () => import('./payment-successful/payment-successful.module').then( m => m.PaymentSuccessfulPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./payment-failed/payment-failed.module').then( m => m.PaymentFailedPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
