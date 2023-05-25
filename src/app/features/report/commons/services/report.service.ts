import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FechasReportModel } from '../../models/fechasReport.model';
import { ReporteFacturaModel } from '../../models/reporteFactura.model';
import { ReportServicesModule } from './services.module';


@Injectable({
  providedIn: ReportServicesModule
})
export class ReportService {

  private baseUrl = environment.apiBaseUrl;
  private reportUrl = environment.apiReportUrl;
  
  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  obtenerFacturasPorRangoFechas(fechas: FechasReportModel): Observable<ReporteFacturaModel[]> {
    return this.http.post<ReporteFacturaModel[]>(`${this.baseUrl}/api/Reportes/ReporteFacturas`, fechas);
  }

  visualizarReporteFactura(idFactura: number) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.reportUrl}/ReportViewer?idFactura=${idFactura}`);
  }
}
