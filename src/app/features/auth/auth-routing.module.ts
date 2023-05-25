import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordView } from './views/forgot-password/forgot-password.view';
import { SignInView } from './views/sign-in/sign-in.view';
import { SignUpView } from './views/sign-up/sign-up.view';

const routes: Routes = [
    { path: '', redirectTo:'sign-in', pathMatch:'full' },
    { 
        path: '', component: AuthComponent, 
        children:  [
          { path: 'sign-in/:id', component: SignInView },
          { path: 'sign-up', component: SignUpView },
          { path: 'forgot-password', component: ForgotPasswordView }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
