import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import { ReportFacturaView } from './views/reportFactura/reportFactura.view';
import { ReportComponent } from './report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportCommonsModule } from './commons/commons.module';
import { MaterialModule } from './commons/material/material.module';
import { SharedComponentsModule } from '../../shared/components/components.module';

@NgModule({
  declarations: [
    ReportComponent,
    ReportFacturaView
  ],
  imports: [
    ReportRoutingModule,
    ReactiveFormsModule,
    ReportCommonsModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class ReportModule { }
