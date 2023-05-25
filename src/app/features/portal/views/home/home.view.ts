import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../commons/services/category.service';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.scss']
})
export class HomeView implements OnInit {

  categorys!: CategoryModel[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
    {
      next: response => {
         this.categorys = response;
       },
       error: error => {
         if(error.status === 404){
           console.log("error 404", error)
         }
       }
    });
  }
}
