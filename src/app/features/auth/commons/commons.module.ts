import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponentsModule } from './components/components.module';
import { AuthServicesModule } from './services/services.module';



@NgModule({
  exports:[AuthComponentsModule],
  imports: [
    CommonModule,
    AuthComponentsModule,
    AuthServicesModule
  ]
})
export class AuthCommonsModule { }
