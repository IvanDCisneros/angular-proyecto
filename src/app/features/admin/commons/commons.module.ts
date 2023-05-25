import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponentsModule } from './components/components.module';
import { AdminServicesModule } from './services/services.module';



@NgModule({
  exports: [AdminComponentsModule],
  imports: [
    CommonModule,
    AdminComponentsModule,
    AdminServicesModule
  ]
  
})
export class AdminCommonsModule { }
