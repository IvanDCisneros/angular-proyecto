import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminSignInView } from './views/admin-sign-in/admin-sign-in.view';
import { PedidoDetailView } from './views/pedido-detail/pedido-detail.view';
import { PedidoListView } from './views/pedido-list/pedido-list.view';
import { ProductCreateView } from './views/product-create/product-create.view';
import { ProductDetailView } from './views/product-detail/product-detail.view';
import { ProductsListView } from './views/products-list/products-list.view';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'admin-sign-in', component: AdminSignInView },
      { path: 'products-list', component: ProductsListView },
      { path: 'product-create', component: ProductCreateView },
      { path: 'product-detail/:id', component: ProductDetailView },
      { path: 'pedido-list', component: PedidoListView },
      { path: 'pedido-detail/:id', component: PedidoDetailView },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

