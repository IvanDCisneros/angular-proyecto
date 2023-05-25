import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../commons/services/product.service';
import { ProductoModel } from '../../models/producto.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.view.html',
  styleUrls: ['./article.view.scss']
})
export class ArticleView implements OnInit {

  products!: ProductoModel[];
  idCategory!: number;

  constructor(
    private productService: ProductService
    , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idCategory = this.route.snapshot.params['id'];
    this.productService.getProductosByIdCategoria(this.idCategory).subscribe(
    {
      next: response => {
        this.products = response;
      },
      error:  error => {
        if (error.status === 404) {
          console.log("error 404", error)
          }
      }
    });
    
  }
}
