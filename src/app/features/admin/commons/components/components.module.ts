import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSignInFormComponent } from './admin-sign-in-form/admin-sign-in-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [AdminSignInFormComponent],
  declarations: [
    AdminSignInFormComponent
  ]
})
export class AdminComponentsModule { }
