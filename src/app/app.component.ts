import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { CartItemModel } from './shared/models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private storageService: StorageService) {
  }

  cart: CartItemModel[] = [];
  title = 'Mundo Indigo Tienda Virtual';

  ngOnInit(): void {
    if (this.storageService.getCart().length === undefined) {
      this.storageService.setCart(this.cart);
    }
  }
}
