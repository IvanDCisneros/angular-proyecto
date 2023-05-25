import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { TableElement } from '../../../../../shared/models/columnas-tabla.model';
import { ColorModel } from '../../../models/color.model';
import { GeneroModel } from '../../../models/genero.model';
import { ProductoMercanciaModel } from '../../../models/productoMercancia.model';
import { ProductoMercanciaDetalleModel } from '../../../models/productoMercanciaDetalle.model';
import { TallaModel } from '../../../models/talla.model';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ToastAnimationsComponent } from '../../../../../shared/components/toast-animations/toast-animations.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss']
})
export class DetailInfoComponent implements OnInit {

  formGroup: FormGroup;

  @Input()
  productoModelDetalleMercancia!: ProductoMercanciaDetalleModel;
  productoMercancia!: ProductoMercanciaModel;
  productoMercanciaOriginal?: ProductoMercanciaModel;
  listaProductoMercancia!: ProductoMercanciaModel[];
  tallas!: TallaModel[];
  generos!: GeneroModel[];
  colores!: ColorModel[];
  existencias!: number;
  valorVenta!: number;
  tableContentMap!: TableElement[];
  inicializarControl: number = 0;
  mostrarControles: boolean = false;
  mostrarCombos: boolean = false;
  idProducto!: number;
    
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private toastr: ToastrService)
  {
    this.formGroup = new FormGroup({
      quantity: new FormControl(),
      talla: new FormControl(),
      genero: new FormControl(),
      color: new FormControl()
    });
  }

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.params['id'];
    this.defineTableContent();
    this.productService.getProductoMercanciaDetalleByIdProducto(this.idProducto).subscribe(
    {
      next: response => {
        this.productoModelDetalleMercancia = response;
        this.productoMercanciaOriginal = this.productoModelDetalleMercancia.listProductoMercancia[0];
        this.inicializarControles();
      },
      error: error => {
        if (error.status === 404) {
          console.log("error 404", error)
        }
      }
    });
  }

  inicializarControles(): void {
    this.listaProductoMercancia = this.productoModelDetalleMercancia.listProductoMercancia;
    this.tallas = this.productoModelDetalleMercancia.listTalla;
    this.generos = this.productoModelDetalleMercancia.listGenero;
    this.colores = this.productoModelDetalleMercancia.listColor;
    this.formGroup.controls["genero"].setValue(this.productoModelDetalleMercancia.listProductoMercancia[0].idGenero);
    this.formGroup.controls["color"].setValue(this.productoModelDetalleMercancia.listProductoMercancia[0].idColor);
    this.formGroup.controls["talla"].setValue(this.productoModelDetalleMercancia.listProductoMercancia[0].idTalla);
    this.onSeleccionarPrecioYCantidad();
    this.mostrarControles = true;

    if (this.listaProductoMercancia.length > 1)
      this.mostrarCombos = true;

  }

  addItem(): void {
    const value = this.formGroup.get('quantity')?.value;
    if (value != 0) {
      this.cartService.addItem(this.productoMercancia, value);
      this.toastr.success("Se añadieron los productos al carrito de compras.", "Información.", { toastComponent: ToastAnimationsComponent });
    }
    else {
      this.toastr.error("De escoger una cantidad mayor que 0 y menor o igual que las cantidades disponibles.", "Lo sentimos!!!");
    }
  }

  onSeleccionarPrecioYCantidad(): void {

    this.formGroup.get('quantity')?.setValue('0');

    var idGenero = this.formGroup.controls["genero"].value;
    var idColor = this.formGroup.controls["color"].value;
    var idTalla = this.formGroup.controls["talla"].value;

    this.productoMercancia = this.listaProductoMercancia.filter(e => e.idGenero == idGenero && e.idColor == idColor && e.idTalla == idTalla)[0];
    
    this.existencias = this.productoModelDetalleMercancia.listProductoMercancia.find(
      e => e.idGenero == idGenero && e.idColor == idColor && e.idTalla == idTalla)?.existencia ?? 0;

    this.valorVenta = this.productoModelDetalleMercancia.listProductoMercancia.find(
      e => e.idGenero == idGenero && e.idColor == idColor && e.idTalla == idTalla)?.valorVenta ?? 0;
  }
  
  defineTableContent() {
    this.tableContentMap = [
      { colName: 'Genero', propName: 'nombreGenero' },
      { colName: 'Talla', propName: 'nombreTalla' },
      { colName: 'Color', propName: 'nombreColor' },
      { colName: 'Existencia', propName: 'existencia' },
    ];
  }
}
