import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInView } from './views/sign-in/sign-in.view';
import { AuthCommonsModule } from './commons/commons.module';
import { SignUpView } from './views/sign-up/sign-up.view';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './commons/material/material.module';
import { ForgotPasswordView } from './views/forgot-password/forgot-password.view';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { LoadingInterceptor } from '../../shared/interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AuthComponent,
    SignInView,
    SignUpView,
    ForgotPasswordView
  ],
  imports: [
    CommonModule,
    AuthCommonsModule, 
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
})
export class AuthModule { }
