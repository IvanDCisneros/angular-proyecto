import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../../../../core/services/session.service';
import { ToastAnimationsComponent } from '../../../../shared/components/toast-animations/toast-animations.component';
import { ProductService } from '../../../portal/commons/services/product.service';
import { ProductoMercanciaModel } from '../../../portal/models/productoMercancia.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.view.html',
  styleUrls: ['./product-detail.view.scss']
})
export class ProductDetailView implements OnInit {

  idProductoMercancia!: number;
  productoMercanciaModel!: ProductoMercanciaModel;
  productGroup!: FormGroup;
  
  get nombreProductoFormControl(): FormControl { return this.productGroup.get('nombreProducto') as FormControl; }
  get descripcionFormControl(): FormControl { return this.productGroup.get('descripcion') as FormControl; }
  get nombreCategoriaFormControl(): FormControl { return this.productGroup.get('nombreCategoria') as FormControl; }
  get nombreGeneroFormControl(): FormControl { return this.productGroup.get('nombreGenero') as FormControl; }
  get nombreColorFormControl(): FormControl { return this.productGroup.get('nombreColor') as FormControl; }
  get nombreTallaFormControl(): FormControl { return this.productGroup.get('nombreTalla') as FormControl; }
  get existenciaFormControl(): FormControl { return this.productGroup.get('existencia') as FormControl; }
  get valorCostoFormControl(): FormControl { return this.productGroup.get('valorCosto') as FormControl; }
  get valorVentaFormControl(): FormControl { return this.productGroup.get('valorVenta') as FormControl; }
  get rutaImagenFormControl(): FormControl { return this.productGroup.get('rutaImagen') as FormControl; }
  
  constructor(
    private formBuilder: FormBuilder
    , private sessionService: SessionService
    , private router: Router
    , private productService: ProductService
    , private route: ActivatedRoute
    , private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.isAuthenticated() || this.sessionService.getRol() != "Administrador") {
      this.toastr.info("Debes logearte como administrador.", "Lo Sentimos!!!");
      return;
    }
    else {
      this.initForm();
      this.idProductoMercancia = this.route.snapshot.params['id'];

      this.productService.getProductoMercanciaById(this.idProductoMercancia).subscribe(
      {
        next: data => {
          this.productoMercanciaModel = data;
          this.productGroup.patchValue(data);
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
        idProducto: [''],
        idProductoMercancia: [''],
        idGenero: [''],
        idColor: [''],
        idTalla: [''],
        nombreProducto: [''],
        descripcion: [''],
        nombreCategoria: [''],
        nombreGenero: [''],
        nombreColor: [''],
        nombreTalla: [''],
        existencia: [''],
        valorCosto: [''],
        valorVenta: [''],
        rutaImagen: ['']
      }
    );
  }

  send(): void {
    this.productService.actualizarProductoMercancia(this.productGroup.getRawValue()).subscribe(
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
