import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatTableModule, 
    MatSortModule, 
    MatIconModule, 
    ReactiveFormsModule]
})
export class MaterialModule { }
