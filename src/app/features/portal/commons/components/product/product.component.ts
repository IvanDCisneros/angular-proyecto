import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from '../../../models/producto.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  productoModel!: ProductoModel;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetail(): void {
    this.router.navigateByUrl(`portal/detail/${this.productoModel.idProducto}`);
  }
}
