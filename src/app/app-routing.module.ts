import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'add-details',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./add-details/add-details.module').then(
        (m) => m.AddDetailsPageModule
      ),
  },
  {
    path: 'payment',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentPageModule),
  },
  {
    path: 'seat-plan',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./seat-plan/seat-plan.module').then((m) => m.SeatPlanPageModule),
  },
  {
    path: 'payment-status',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./payment-status/payment-status.module').then(
        (m) => m.PaymentStatusPageModule
      ),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile/profile.module').then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: 'feedback',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackPageModule),
  },
  {
    path: 'feedback-sent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feedback-sent/feedback-sent.module').then(
        (m) => m.FeedbackSentPageModule
      ),
  },
  {
    path: 'payment-mode',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./payment-mode/payment-mode.module').then(
        (m) => m.PaymentModePageModule
      ),
  },
  {
    path: 'select-seat',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./select-seat/select-seat.module').then(
        (m) => m.SelectSeatPageModule
      ),
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationPageModule
      ),
  },
  {
    path: 'session-ended',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./session-ended/session-ended.module').then(
        (m) => m.SessionEndedPageModule
      ),
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
