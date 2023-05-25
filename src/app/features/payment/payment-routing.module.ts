import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';
import { PaymentComponent } from './payment.component';
import { CartView } from './views/cart/cart.view';
import { OrderDetailView } from './views/order-detail/order-detail.view';

const routes: Routes = [
  {
    path: '', component: PaymentComponent,
    children: [
      { path: 'cart', component: CartView },
      { path: 'order-detail', canActivate: [IsAuthenticatedGuard], component: OrderDetailView }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
