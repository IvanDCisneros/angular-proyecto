import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { StorageService } from '../../../../core/services/storage.service';
import { TableElement } from '../../../../shared/models/columnas-tabla.model';
import { EstadoPedidoService } from '../../commons/services/estadoPedido.service';
import { PedidoService } from '../../commons/services/pedido.service';
import { EstadoPedidoModel } from '../../models/estadoPedido.model';
import { FechasPedidoModel } from '../../models/fechasReport.model';
import { PedidoModel } from '../../models/pedidos.model';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.view.html',
  styleUrls: ['./pedido-list.view.scss']
})
export class PedidoListView implements OnInit {

  formGroup!: FormGroup;
  fechasPedidos!: FechasPedidoModel;
  listaPedidos!: PedidoModel[];
  tableContentMap!: TableElement[];
  estadoPedidos!: EstadoPedidoModel[];
  mostrarControles: boolean = false;
  
  constructor(
    private sessionService: SessionService,
    private pedidoService: PedidoService,
    private estadoPedidoService: EstadoPedidoService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() != "Administrador") {
      this.toastr.info("Debes logearte como administrador.", "Lo Sentimos!!!");
      return;
    }
    else {
      this.defineTableContent();
      this.initForm();
      this.estadoPedidoService.obtenerEstadoPedidos().subscribe(
      {
        next: response => {
          this.estadoPedidos = response;
        },
        error: error => {
          if (error.status === 404) {
            console.log("error 404", error)
          }
        }
      });
    }
  }
     
  initForm() {
    this.formGroup = new FormGroup({
      fechaInicio: new FormControl(),
      fechaFin: new FormControl(),
      estadoPedido: new FormControl(),
    });
  }

  consultarPedidos() {
    this.mostrarControles = false;
    let puedeContinuar: boolean = true;

    if (this.formGroup.controls["estadoPedido"].value === null) {
      this.toastr.error("Debe seleccionar el estado de pedido.", "Lo Sentimos!!!");
      puedeContinuar = false;
    }

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
      this.fechasPedidos = new FechasPedidoModel;
      this.fechasPedidos.fechaInicio = this.datePipe.transform(this.formGroup.get('fechaInicio')?.value, "yyyy-MM-dd")?.toString() || '';
      this.fechasPedidos.fechaFin = this.datePipe.transform(this.formGroup.get('fechaFin')?.value, "yyyy-MM-dd")?.toString() || '';
      this.fechasPedidos.idEstadoPedido = this.formGroup.controls["estadoPedido"].value,

      this.pedidoService.obtenerPedidosPorEstadoYRangoFechas(this.fechasPedidos).subscribe(
      {
        next: data => {
          this.listaPedidos = data;
          this.mostrarControles = true;
          },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }

  onClickDetail(item: PedidoModel): void {
    this.router.navigateByUrl(`/admin/pedido-detail/${item.idPedido}`)
  }

  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Fecha', propName: 'fechaRegistro' },
      { colName: 'Número orden', propName: 'numeroFactura' },
      { colName: 'Identificación', propName: 'identificacion' },
      { colName: 'Cliente', propName: 'nombreCliente' },
      { colName: 'Estado Pedido', propName: 'nombreEstadoPedido' },
      { colName: 'Número Guía', propName: 'numeroGuia' },
      { colName: 'Empresa Envío', propName: 'empresaEnvio' },
    ];
  }
}
