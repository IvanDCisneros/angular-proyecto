import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report.component';
import { ReportFacturaView } from './views/reportFactura/reportFactura.view';


const routes: Routes = [
  { path: '', redirectTo: 'report-factura', pathMatch: 'full' },
  {
    path: '', component: ReportComponent,
    children: [
      { path: 'report-factura', component: ReportFacturaView }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }

