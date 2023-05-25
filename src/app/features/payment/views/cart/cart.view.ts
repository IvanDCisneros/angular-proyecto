import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { EIva } from 'src/app/shared/constants/cart.enum';
import { CartItemModel } from 'src/app/shared/models/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { TableElement } from '../../../../shared/models/columnas-tabla.model';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../../../../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SessionService } from '../../../../core/services/session.service';
import { ToastrService } from 'ngx-toastr';
import { SuscripcionService } from '../../commons/services/suscripcion.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductoMercanciaEnum } from '../../../../shared/constants/productoMercancia.enum';
import { OpcionRetornoEnum } from '../../../../shared/constants/opcionRetorno.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.view.html',
  styleUrls: ['./cart.view.scss']
})
export class CartView implements OnInit {

  private helper = new JwtHelperService();
  cart!: CartItemModel[];
  tableContentMap!: TableElement[];
  mostrarControles!: boolean;
  carritoConSuscripcion!: boolean;
  mostrarControlesSuscripcion!: boolean;
  valorSuscripcion!: number;
  get token() { return this.storageService.getToken(); }

  constructor(
    private router: Router,
    private storageService: StorageService,
    private cartService: CartService,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private suscripcionService: SuscripcionService
  ) { }

  ngOnInit(): void {
    this.valorSuscripcion = 0;
    this.defineTableContent();
    this.cart = this.storageService.getCart();
    this.inicializarControles();
  }

  inicializarControles(): void {
    this.mostrarControles = true;
    this.carritoConSuscripcion = false;
    if (this.cart.length === 0) {
      this.mostrarControles = false;
    }
    else {
      this.cart.forEach(element => {
        if (element.idProductoMercancia === ProductoMercanciaEnum.Suscripcion) {
          this.mostrarControlesSuscripcion = false;
          this.carritoConSuscripcion = true;
        }
      })
    }
  }

  getSubTotal(): string {
    let suma = 0;
    this.cart.forEach(element => {
      element.subTotal = element.valorVenta * element.cantidad
      suma = suma + (element.valorVenta * element.cantidad);
    })
    return suma.toString();
  }

  getTotal(): string {
    const subTotal = Number(this.getSubTotal());
    let total = subTotal * EIva.IVA + subTotal;
    return (total).toString();
  }

  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Nombre', propName: 'nombreProducto' }, 
      { colName: 'Genero', propName: 'nombreGenero' },
      { colName: 'Talla', propName: 'nombreTalla' },
      { colName: 'Color', propName: 'nombreColor' },
      { colName: 'En Bodega', propName: 'existenciasBodega'},
      { colName: 'Precio COP', propName: 'valorVenta', format: "currency" },
      { colName: 'Cantidad', propName: 'cantidad' },
      { colName: 'Sub Total COP', propName: 'subTotal', format: "currency" }
    ];
  }

  onClickAdd(item: CartItemModel): void {
    if (item.idProductoMercancia != ProductoMercanciaEnum.Suscripcion) { 
      if (item.cantidad < item.existenciasBodega) {
        item.cantidad = item.cantidad + 1;
        item.subTotal = item.cantidad * item.valorVenta;
        this.storageService.setCart(this.cart);
        this.cartService.sendQuantity();
      }
    }
  }

  onClickRemove(item: CartItemModel): void {
    if (item.cantidad != 0) {
      if (item.cantidad > 1) {
        item.cantidad = item.cantidad - 1;
        item.subTotal = item.cantidad * item.valorVenta;
        this.storageService.setCart(this.cart);
        this.cartService.sendQuantity();
      }
      else if (item.cantidad = 1) {
        const dialogRef = this.dialog.open(MatConfirmDialogComponent,
        {
            width: '390px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: { message: 'En realidad desea no adquirir el producto' }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.cart = this.cart.filter((elemento) => elemento.idProductoMercancia !== item.idProductoMercancia);
            this.storageService.setCart(this.cart);
            this.cartService.sendQuantity();
            this.inicializarControles();
          }
        });
      }
    }
  }

  onClickBuy(): void {
    if (!this.carritoConSuscripcion) {
      const dialogRef = this.dialog.open(MatConfirmDialogComponent,
        {
          width: '390px',
          panelClass: 'confirm-dialog-container',
          disableClose: true,
          data: { message: 'Aún no has adquirido la suscripción mensual. ¿Deseas continuar con tu compra?' }
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (!this.sessionService.isAuthenticated())
            this.router.navigateByUrl(`/auth/sign-in/${OpcionRetornoEnum.OrderDetail}`)
          else if (this.sessionService.isAuthenticated() && this.sessionService.getRol() != "Administrador")
            this.router.navigateByUrl('/payment/order-detail')
          else
            this.toastr.error("Para realizar una compra debes estar logeado como cliente.", "Lo Sentimos!!!");
        }
      });
    }
    else {
      if (!this.sessionService.isAuthenticated())
        this.router.navigateByUrl(`/auth/sign-in/${OpcionRetornoEnum.OrderDetail}`)
      else if (this.sessionService.isAuthenticated() && this.sessionService.getRol() != "Administrador")
        this.router.navigateByUrl('/payment/order-detail')
      else
        this.toastr.error("Para realizar una compra debes estar logeado como cliente.", "Lo Sentimos!!!");
    }
  }

  obtenerValorSuscripcion(ob: MatCheckboxChange) {
    this.mostrarControlesSuscripcion = false;
    if (ob.checked) {
      if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() == "Administrador") {
        this.toastr.error("Para agregar la suscripción mensual debes estar logeado ingresando a la aplicación.", "Lo Sentimos!!!");
        this.router.navigateByUrl(`/auth/sign-in/${OpcionRetornoEnum.CarritoDeCompras}`)
      }
      else {
        if (this.valorSuscripcion === 0) {
          this.suscripcionService.obtenerValorSuscripcion(this.helper.decodeToken(this.token).nameid).subscribe(
          {
            next: data => {
                this.valorSuscripcion = data;
                this.mostrarControlesSuscripcion = true;
            },
            error: err => {
                this.toastr.error(err.error, "Algo inesperado ha sucedio:");
            }
          });
        }
        else {
          this.mostrarControlesSuscripcion = true;
        }
      }
    }
  }

  agregarSuscripcionAlCarrito() {
    this.cart = this.storageService.getCart();
    let isExist: boolean = false;
    if (this.cart && this.cart.length > 0) {
      this.cart.forEach(item => {
        if (item.idProductoMercancia === ProductoMercanciaEnum.Suscripcion) { 
          isExist = true
        }
      });
    }
    if (!isExist) {
      this.cart.push({
        idProductoMercancia: ProductoMercanciaEnum.Suscripcion, 
        nombreProducto: "Suscripción Mensual",
        nombreGenero: "No Aplica",
        nombreTalla: "No Aplica",
        nombreColor: "No Aplica",
        existenciasBodega: 9999,
        valorVenta: this.valorSuscripcion,
        cantidad: 1,
        subTotal: this.valorSuscripcion
      });
    }
    this.storageService.setCart(this.cart);
    this.cartService.sendQuantity();
    this.inicializarControles();
  }
}
