import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductComponent } from './product/product.component';
import { DetailImgComponent } from './detail-img/detail-img.component';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { SharedComponentsModule } from '../../../../shared/components/components.module';

const COMPONENTS = [ProductComponent, DetailImgComponent, DetailInfoComponent, CategoryComponent]

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, MaterialModule],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
  
})
export class PortalComponentsModule { }
