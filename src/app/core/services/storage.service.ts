import { Injectable } from '@angular/core';
import { CartItemModel } from 'src/app/shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private keyCart: string = 'cart';
  private keyToken: string = 'token';

  constructor() { }

  setCart(cart: CartItemModel[]): void {
    localStorage.setItem(this.keyCart, JSON.stringify(cart));
  }

  getCart(): CartItemModel[] {
    return JSON.parse(localStorage.getItem(this.keyCart) || '{}');
  }

  setToken(token: string): void {
    localStorage.setItem(this.keyToken, token);
  }

  getToken(): string {
    return localStorage.getItem(this.keyToken) || '';
  }
}
