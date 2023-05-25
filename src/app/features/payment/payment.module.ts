import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { CartView } from './views/cart/cart.view';
import { PaymentComponent } from './payment.component';
import { OrderDetailView } from './views/order-detail/order-detail.view';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { PaymentCommonsModule } from './commons/commons.module';
import { MaterialModule } from './commons/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../../shared/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    CartView,
    PaymentComponent,
    OrderDetailView
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    PaymentCommonsModule,
    SharedComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
})
export class PaymentModule { }
