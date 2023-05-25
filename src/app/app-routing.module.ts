import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal', loadChildren: () => import('./features/portal/portal.module').then(m => m.PortalModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'report', loadChildren: () => import('./features/report/report.module').then(m => m.ReportModule) },
  {
    path: 'payment',
    //canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule)
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
