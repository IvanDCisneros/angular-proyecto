import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportServicesModule } from './services/services.module';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    ReportServicesModule
  ]
  
})
export class ReportCommonsModule { }
