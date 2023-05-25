import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { EstadoPedidoService } from '../../commons/services/estadoPedido.service';
import { PedidoService } from '../../commons/services/pedido.service';
import { EstadoPedidoModel } from '../../models/estadoPedido.model';
import { PedidoModel } from '../../models/pedidos.model';

@Component({
  selector: 'app-pedido-detail',
  templateUrl: './pedido-detail.view.html',
  styleUrls: ['./pedido-detail.view.scss']
})
export class PedidoDetailView implements OnInit {

  idPedido!: number;
  pedidoModel!: PedidoModel;
  pedidoGroup!: FormGroup;
  estadoPedidos!: EstadoPedidoModel[];
  
  get fechaRegistroFormControl(): FormControl { return this.pedidoGroup.get('fechaRegistro') as FormControl; }
  get numeroFacturaFormControl(): FormControl { return this.pedidoGroup.get('numeroFactura') as FormControl; }
  get identificacionFormControl(): FormControl { return this.pedidoGroup.get('identificacion') as FormControl; }
  get nombreClienteFormControl(): FormControl { return this.pedidoGroup.get('nombreCliente') as FormControl; }
  get idEstadoPedido(): FormControl { return this.pedidoGroup.get('idEstadoPedido') as FormControl; }
  get numeroGuiaFormControl(): FormControl { return this.pedidoGroup.get('numeroGuia') as FormControl; }
  get empresaEnvioFormControl(): FormControl { return this.pedidoGroup.get('empresaEnvio') as FormControl; }


  constructor(
    private formBuilder: FormBuilder
    , private sessionService: SessionService
    , private router: Router
    , private pedidoService: PedidoService
    , private estadoPedidoService: EstadoPedidoService
    , private route: ActivatedRoute
    , private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() != "Administrador") {
      this.toastr.info("Debes logearte como administrador.", "Lo Sentimos!!!");
      return;
    }
    else {
      this.initForm();
      this.idPedido = this.route.snapshot.params['id'];
      this.estadoPedidoService.obtenerEstadoPedidos().subscribe(
      {
        next: response => {
          this.estadoPedidos = response;
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });

      this.pedidoService.obtenerPedidoPorId(this.idPedido).subscribe(
      {
        next: data => {
          this.pedidoModel = data;
          this.pedidoGroup.patchValue(data);
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
          }
      });
    }
  }
  
  initForm() {
    this.pedidoGroup = this.formBuilder.group(
      {
        idPedido: [''],
        fechaRegistro: [''],
        numeroFactura: [''],
        identificacion: [''],
        nombreCliente: [''],
        idEstadoPedido: [''],
        numeroGuia: [''],
        empresaEnvio: ['']
      }
    );
  }
  
  send(): void {
    this.pedidoService.guardarPedido(this.pedidoGroup.getRawValue()).subscribe(
    { next: data => {
      this.toastr.success("El pedido fue guardado con exito", "Información", { toastComponent: ToastAnimationsComponent });
      this.router.navigateByUrl('/admin/pedido-list')
    },
      error: err => {
        this.toastr.error(err.error, "Algo inesperado ha sucedio:");
      }
    });
  }
}
