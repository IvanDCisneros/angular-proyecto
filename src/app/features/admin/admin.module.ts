import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { LoadingInterceptor } from '../../shared/interceptors/loading.interceptor';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminCommonsModule } from './commons/commons.module';
import { MaterialModule } from './commons/material/material.module';
import { AdminSignInView } from './views/admin-sign-in/admin-sign-in.view';
import { PedidoDetailView } from './views/pedido-detail/pedido-detail.view';
import { PedidoListView } from './views/pedido-list/pedido-list.view';
import { ProductCreateView } from './views/product-create/product-create.view';
import { ProductDetailView } from './views/product-detail/product-detail.view';
import { ProductsListView } from './views/products-list/products-list.view';

@NgModule({
  declarations: [
    ProductsListView,
    ProductCreateView,
    AdminComponent,
    AdminSignInView,
    PedidoListView,
    PedidoDetailView,
    ProductDetailView
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminCommonsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  providers: [
   { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
})
export class AdminModule { }
