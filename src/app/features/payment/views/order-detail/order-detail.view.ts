import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart.service';
import { StorageService } from '../../../../core/services/storage.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { CartItemModel } from '../../../../shared/models/cart.model';
import { TableElement } from '../../../../shared/models/columnas-tabla.model';
import { FacturaService } from '../../commons/services/factura.service';
import { DatosParaFactura } from '../../models/datosParaFactura.model';
import { FacturaModel } from '../../models/factura.model';
import { ItemFacturaModel } from '../../models/itemFactura.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.view.html',
  styleUrls: ['./order-detail.view.scss']
})
export class OrderDetailView implements OnInit {

  private helper = new JwtHelperService();
  facturaDeVenta!: FormGroup;
  cart!: CartItemModel[];
  itemsFactura!: ItemFacturaModel[];
  factura!: FacturaModel;
  datosParaFactura: DatosParaFactura[] = [];
  tableContentMap!: TableElement[];
  diferenteCiudad: boolean = false;

  get token() { return this.storageService.getToken(); }
  get nombreClienteFormControl(): FormControl { return this.facturaDeVenta.get('nombreCliente') as FormControl; }
  get identificacionClienteFormControl(): FormControl { return this.facturaDeVenta.get('identificacionCliente') as FormControl; }
  get direccionFormControl(): FormControl { return this.facturaDeVenta.get('direccion') as FormControl; }
  get ciudadFormControl(): FormControl { return this.facturaDeVenta.get('ciudad') as FormControl; }
  get departamentoFormControl(): FormControl { return this.facturaDeVenta.get('departamento') as FormControl; }
  get telefonoFormControl(): FormControl { return this.facturaDeVenta.get('telefono') as FormControl; }
  get correoElectronicoFormControl(): FormControl { return this.facturaDeVenta.get('correoElectronico') as FormControl; }
  get numeroFacturaFormControl(): FormControl { return this.facturaDeVenta.get('numeroFactura') as FormControl; }
  get fechaFormControl(): FormControl { return this.facturaDeVenta.get('fecha') as FormControl; }
  get nombreEstadoFacturaFormControl(): FormControl { return this.facturaDeVenta.get('nombreEstadoFactura') as FormControl; }
  get valorTotalFormControl(): FormControl { return this.facturaDeVenta.get('valorTotal') as FormControl; }
  
  constructor(
    private storageService: StorageService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartService,
  ) {  }

  ngOnInit(): void {
    this.defineTableContent();
    this.cart = this.storageService.getCart();
    this.obtenerDatosFactura();
    this.initForm();
  }

  initForm() {
    
    this.facturaDeVenta = this.formBuilder.group(
      {
        numeroFactura: new FormControl({ value: '', disabled: true }),
        fecha: new FormControl({ value: '', disabled: true }),
        nombreEstadoFactura: new FormControl({ value: '', disabled: true }),
        identificacionCliente: new FormControl({ value: '', disabled: true }),
        nombreCliente: new FormControl({ value: '', disabled: true }),
        direccion: new FormControl({ value: '', disabled: true }),
        ciudad: new FormControl({ value: '', disabled: true }),
        departamento: new FormControl({ value: '', disabled: true }),
        telefono: new FormControl({ value: '', disabled: true }),
        correoElectronico: new FormControl({ value: '', disabled: true }),
        valorTotal: new FormControl({ value: '', disabled: true }),
      }
    );
  }

  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Código Articulo', propName: 'codigoArticulo' },
      { colName: 'Descripción', propName: 'descripcion' },
      { colName: 'Valor Unitario COP', propName: 'valorUnitario', format: "currency" },
      { colName: 'Cantidad', propName: 'cantidad' },
      { colName: 'Sub Total COP', propName: 'subTotal', format: "currency" }
    ];
  }

  obtenerDatosFactura() {
    if (this.cart.length != 0) {
      this.cart.forEach(element => {
        if (element.cantidad > 0) {
          this.datosParaFactura.push(
            {
              idCliente: this.helper.decodeToken(this.token).nameid,
              idProductoMercancia: element.idProductoMercancia,
              valorVenta: element.valorVenta,
              cantidad: element.cantidad,
              subTotal: element.subTotal
            });
        }
      })
      this.facturaService.creacionFactura(this.datosParaFactura).subscribe(
      {
        next: data => {
          this.factura = data;
          this.itemsFactura = data.listItemsFacturas;
          this.facturaDeVenta.patchValue(data);
          if (data.ciudad != 'Pasto')
            this.diferenteCiudad = true;
          this.toastr.success("Felicidades!!!. Tú orden de compra se generó con éxito", "Información", { toastComponent: ToastAnimationsComponent });
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
          this.facturaService.actualizarCarrito(this.cart).subscribe((data) => {
            this.storageService.setCart(data);
            this.cartService.sendQuantity();
            this.router.navigateByUrl(`/payment/cart`);
          });
        }
      });
    }
    else {
      this.toastr.error("Lo sentimos!!!, Aun no tiene productos en su carrito de compras.");
      this.router.navigateByUrl(`/portal/home`);
    }
  }

  onClickPagar() {
    this.facturaService.pagarFactura(this.factura.idFactura).subscribe(
      {
        next: data => {
          this.toastr.success("Felicidades!!!. Tú compra se generó con éxito, se envio notificación de tu compra al correo electrónico y el pedido a la dirección registrada", "Información", { toastComponent: ToastAnimationsComponent });
          this.cart = [];
          this.storageService.setCart(this.cart);
          this.cartService.sendQuantity();
          this.router.navigateByUrl(`/portal/home`);
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
          this.facturaService.actualizarCarrito(this.cart).subscribe((data) => {
          this.storageService.setCart(data);
          this.cartService.sendQuantity();
          this.router.navigateByUrl(`/payment/cart`);
        });
      }
    });
  }
}
