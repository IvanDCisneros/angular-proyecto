import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductoModel } from '../../../models/producto.model';
import { ProductoImagenesModel } from '../../../models/productoImagenes.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-detail-img',
  templateUrl: './detail-img.component.html',
  styleUrls: ['./detail-img.component.scss']
})
export class DetailImgComponent implements OnInit {

  @Input()
  images!: string;
  productoModel!: ProductoModel;
  productoImagenesModel!: ProductoImagenesModel[];
  srcMain!: string;
  @ViewChild('slider', { static: false })
  sliderImg!: ElementRef;
  idProducto!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
   
  }

  ngOnInit(): void {
    this.idProducto = this.route.snapshot.params['id'];
    this.productService.getImagenesProductoByIdProducto(this.idProducto).subscribe(
    {
      next: response => {
        this.productoImagenesModel = response;
        this.srcMain = this.productoImagenesModel[0].rutaImagen;
      },
      error : error => {
        if (error.status === 404) {
          console.log("error 404", error)
        }
      }
    });
  }

  getImages(): string {
    return `${environment.apiBaseUrl}/${this.images}`;
  }

  toogleImg(url: string): void {
    this.srcMain = url;
  }

  up(): void {
    this.sliderImg.nativeElement.scrollTop -= 80;
  }
  down(): void {
    this.sliderImg.nativeElement.scrollTop += 80;
  }

}
