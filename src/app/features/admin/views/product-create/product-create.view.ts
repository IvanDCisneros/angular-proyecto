import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { ProductService } from '../../../portal/commons/services/product.service';
import { CategoryModel } from '../../../portal/models/category.model';
import { ColorModel } from '../../../portal/models/color.model';
import { GeneroModel } from '../../../portal/models/genero.model';
import { ListasParametrizacionProducto } from '../../../portal/models/listasParametrizacionesProducto';
import { ProductoMercanciaModel } from '../../../portal/models/productoMercancia.model';
import { TallaModel } from '../../../portal/models/talla.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.view.html',
  styleUrls: ['./product-create.view.scss']
})
export class ProductCreateView implements OnInit {

  productoMercanciaModel!: ProductoMercanciaModel;
  productGroup!: FormGroup;
  tallas!: TallaModel[];
  categorias!: CategoryModel[];
  colores!: ColorModel[];
  generos!: GeneroModel[];
  listasParametrizacionProducto!: ListasParametrizacionProducto;


  get idCategoriaFormControl(): FormControl { return this.productGroup.get('idCategoria') as FormControl; }
  get nombreProductoFormControl(): FormControl { return this.productGroup.get('nombreProducto') as FormControl; }
  get descripcionFormControl(): FormControl { return this.productGroup.get('descripcion') as FormControl; }
  get rutaImagenFormControl(): FormControl { return this.productGroup.get('rutaImagen') as FormControl; }
  get idGeneroFormControl(): FormControl { return this.productGroup.get('idGenero') as FormControl; }
  get idColorFormControl(): FormControl { return this.productGroup.get('idColor') as FormControl; }
  get idTallaFormControl(): FormControl { return this.productGroup.get('idTalla') as FormControl; }
  get existenciaFormControl(): FormControl { return this.productGroup.get('existencia') as FormControl; }
  get valorCostoFormControl(): FormControl { return this.productGroup.get('valorCosto') as FormControl; }
  get valorVentaFormControl(): FormControl { return this.productGroup.get('valorVenta') as FormControl; }

  constructor(
    private formBuilder: FormBuilder
    , private sessionService: SessionService
    , private router: Router
    , private productService: ProductService
    , private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() != "Administrador") {
      this.toastr.info("Debes logearte como administrador.", "Lo Sentimos!!!");
      return;
    }
    else {
      this.initForm();

      this.productService.getListadoParametrizacionProducto().subscribe(
        {
          next: data => {
            this.listasParametrizacionProducto = data;
            this.categorias = this.listasParametrizacionProducto.listCategoria;
            this.colores = this.listasParametrizacionProducto.listColor;
            this.tallas = this.listasParametrizacionProducto.listTalla;
            this.generos = this.listasParametrizacionProducto.listGenero;
          },
          error: err => {
            this.toastr.error(err.error, "Algo inesperado ha sucedio:");
        }
      });
    }
  }

  initForm() {
    this.productGroup = this.formBuilder.group(
      {
        idCategoria: ['', [Validators.required]],
        nombreProducto: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        rutaImagen: ['', [Validators.required]],
        idGenero: ['', [Validators.required]],
        idColor: ['', [Validators.required]],
        idTalla: ['', [Validators.required]],
        existencia: ['', [Validators.required]],
        valorCosto: ['', [Validators.required]],
        valorVenta: ['', [Validators.required]]
      }
    );
  }

  send(): void {
    this.productService.crearProductoMercancia(this.productGroup.getRawValue()).subscribe(
    {
      next: data => {
        this.toastr.success("El producto fue guardado con exito", "Información", { toastComponent: ToastAnimationsComponent });
        this.router.navigateByUrl('/admin/products-list')
      },
      error: err => {
        this.toastr.error(err.error, "Algo inesperado ha sucedio:");
      }
    });
  }
}
