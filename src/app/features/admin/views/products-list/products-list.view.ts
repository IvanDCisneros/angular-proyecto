import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { TableElement } from '../../../../shared/models/columnas-tabla.model';
import { CategoryService } from '../../../portal/commons/services/category.service';
import { ProductService } from '../../../portal/commons/services/product.service';
import { CategoryModel } from '../../../portal/models/category.model';
import { ProductoMercanciaModel } from '../../../portal/models/productoMercancia.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.view.html',
  styleUrls: ['./products-list.view.scss']
})
export class ProductsListView implements OnInit {

  formGroup!: FormGroup;
  listaProductosMercancia!: ProductoMercanciaModel[];
  tableContentMap!: TableElement[];
  categorias!: CategoryModel[];
  mostrarControles: boolean = false;

  constructor(
    private sessionService: SessionService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() != "Administrador") {
      this.toastr.info("Debes logearte como administrador.", "Lo Sentimos!!!");
      return;
    }
    else {
      this.defineTableContent();
      this.initForm();
      this.categoryService.getAll().subscribe(
      {
        next: response => {
          this.categorias = response;
        },
        error: error => {
          if (error.status === 404) {
            console.log("error 404", error)
          }
        }
      });
    }
  }

  initForm() {
    this.formGroup = new FormGroup({
      categorias: new FormControl(),
    });
  }

  consultarProductos() {
    this.mostrarControles = false;
    let puedeContinuar: boolean = true;

    if (this.formGroup.controls["categorias"].value === null) {
      this.toastr.error("Debe seleccionar la categoria.", "Lo Sentimos!!!");
      puedeContinuar = false;
    }

    if (puedeContinuar) {
      this.productService.getProductosMercanciaByIdCategoria(this.formGroup.controls["categorias"].value).subscribe(
      {
        next: data => {
        this.listaProductosMercancia = data;
        this.mostrarControles = true;
        },
        error: err => {
          this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }

  onClickDetail(item: ProductoMercanciaModel): void {
    this.router.navigateByUrl(`/admin/product-detail/${item.idProductoMercancia}`)
  }

  crearProducto() {
    this.router.navigateByUrl('/admin/product-create')
  }

  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Categoria', propName: 'nombreCategoria' },
      { colName: 'Nombre', propName: 'nombreProducto' },
      { colName: 'Genero', propName: 'nombreGenero' },
      { colName: 'Color', propName: 'nombreColor' },
      { colName: 'Talla', propName: 'nombreTalla' },
      { colName: 'Existencia', propName: 'existencia' },
      { colName: 'Vlr Costo', propName: 'valorCosto' },
      { colName: 'Vlr Venta', propName: 'valorVenta' },
    ];
  }
}
