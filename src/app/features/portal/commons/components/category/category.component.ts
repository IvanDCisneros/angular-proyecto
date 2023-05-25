import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from '../../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input()
  categoryModel!: CategoryModel;
  
  constructor(private router: Router)  { }

  ngOnInit(): void {
  }

  obtenerProductos() {
    this.router.navigateByUrl(`portal/article/${this.categoryModel.idCategoria}`);
  }
}
