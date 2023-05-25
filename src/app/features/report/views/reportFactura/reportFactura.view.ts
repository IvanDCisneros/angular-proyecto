import { DatePipe } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../core/services/storage.service';
import { TableElement } from '../../../../shared/models/columnas-tabla.model';
import { ReportService } from '../../commons/services/report.service';
import { FechasReportModel } from "../../models/fechasReport.model";
import { ReporteFacturaModel } from '../../models/reporteFactura.model';

@Component({
  selector: 'app-report-factura',
  templateUrl: 'reportFactura.view.html',
  styleUrls: ['reportFactura.view.scss']
})
export class ReportFacturaView implements OnInit {

  private helper = new JwtHelperService();
  formGroup!: FormGroup;
  fechasReport!: FechasReportModel;
  listaFacturas!: ReporteFacturaModel[];
  mostrarControles: boolean = false;
  mostrarReporte: boolean = false;
  tableContentMap!: TableElement[];
  reportUrl!: SafeResourceUrl;
  
  get token() { return this.storageService.getToken(); }

  constructor(
    private storageService: StorageService,
    private reportService: ReportService,
    private toastr: ToastrService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.defineTableContent();
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      fechaInicio: new FormControl(),
      fechaFin: new FormControl(),
    });
  }

  consultarFacturas() {

    let puedeContinuar: boolean = true;
    this.mostrarReporte = false;

    if (this.formGroup.get('fechaFin')?.value === null) {
      this.toastr.error("Debe seleccionar la fecha fin.", "Lo Sentimos!!!");
      puedeContinuar = false;
    }

    if (this.formGroup.get('fechaInicio')?.value === null) {
      this.toastr.error("Debe seleccionar la fecha de inicio.", "Lo Sentimos!!!");
      puedeContinuar = false;
    }

    if (this.formGroup.get('fechaFin')?.value < this.formGroup.get('fechaInicio')?.value) {
      this.toastr.error("La fecha fin no puede ser menor que la fecha inicio.", "Lo Sentimos!!!");
      puedeContinuar = false;
    }

    if (puedeContinuar) {
      this.fechasReport = new FechasReportModel;
      this.fechasReport.fechaInicio = this.datePipe.transform(this.formGroup.get('fechaInicio')?.value, "yyyy-MM-dd")?.toString() || '';
      this.fechasReport.fechaFin = this.datePipe.transform(this.formGroup.get('fechaFin')?.value, "yyyy-MM-dd")?.toString() || '';
      this.fechasReport.idCliente = this.helper.decodeToken(this.token).nameid,

      this.reportService.obtenerFacturasPorRangoFechas(this.fechasReport).subscribe(
      {
        next: data => {
          this.listaFacturas = data;
          this.mostrarControles = true;
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }

  onClickDetail(item: ReporteFacturaModel): void {
    this.mostrarReporte = true;
    this.reportUrl = this.reportService.visualizarReporteFactura(item.idFactura);
  }

  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Identificación', propName: 'identificacion' },
      { colName: 'Nombre', propName: 'nombre' },
      { colName: 'Fecha', propName: 'fecha' },
      { colName: 'Número', propName: 'numeroFactura' },
      { colName: 'Estado', propName: 'nombreEstado' },
      { colName: 'Descripción', propName: 'descripcion' },
      { colName: 'Valor Total', propName: 'valorTotal', format: "currency" },
    ];
  }
}

