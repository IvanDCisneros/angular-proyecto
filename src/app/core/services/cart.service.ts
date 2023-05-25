import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItemModel } from 'src/app/shared/models/cart.model';
import { ProductoMercanciaModel } from '../../features/portal/models/productoMercancia.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemInCart: Subject<number> = new Subject<number>();
  cart!: CartItemModel[];
  cantidadTotal: number = 0;

  constructor(private storageService: StorageService) {
  }
  
  public sendQuantity(): void {
    this.cart = this.storageService.getCart();
    this.cantidadTotal = 0;
    this.cart.forEach(item => {
      this.cantidadTotal = this.cantidadTotal + item.cantidad;
    })
    this.itemInCart.next(this.cantidadTotal)
  }

  addItem(productoMercanciaModel: ProductoMercanciaModel, cantidad: number): void {
    this.cart = this.storageService.getCart();
    let isExist: boolean = false;
    if (this.cart && this.cart.length > 0) {
      this.cart.forEach(item => {
        if (item.idProductoMercancia === productoMercanciaModel.idProductoMercancia) {

          if (item.cantidad + cantidad <= item.existenciasBodega) {
            item.cantidad = item.cantidad + cantidad;
            item.subTotal = item.cantidad * item.valorVenta;
            isExist = true
          }
          else {
            item.cantidad = item.existenciasBodega;
            isExist = true
          }
        }
      });
    }
    if (!isExist) {

      if (productoMercanciaModel.existencia < cantidad)
        cantidad = productoMercanciaModel.existencia;

      this.cart.push({
          idProductoMercancia: productoMercanciaModel.idProductoMercancia,
          nombreProducto: productoMercanciaModel.nombreProducto,
          nombreGenero: productoMercanciaModel.nombreGenero,
          nombreTalla: productoMercanciaModel.nombreTalla,
          nombreColor: productoMercanciaModel.nombreColor,
          existenciasBodega: productoMercanciaModel.existencia,
          valorVenta: productoMercanciaModel.valorVenta,
          cantidad: cantidad,
          subTotal: productoMercanciaModel.valorVenta * cantidad
        });
    }
    this.storageService.setCart(this.cart);
    this.sendQuantity();
  }
}
