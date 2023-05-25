import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';


@NgModule({
  exports: [MatInputModule, MatDatepickerModule, MatButtonModule],
  providers: [DatePipe]
})
export class MaterialModule { }
