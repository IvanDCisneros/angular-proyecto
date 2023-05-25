import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialTableComponent } from './material-table/material-table.component';
import { MatTableModule } from '@angular/material/table';
import { DisplayFormatService } from '../services/display-format.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ToastAnimationsComponent } from './toast-animations/toast-animations.component';
import { LoadingComponent } from './loading/loading.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  declarations: [
    MaterialTableComponent,
    MatConfirmDialogComponent,
    ToastAnimationsComponent,
    LoadingComponent
  ],
  exports: [MaterialTableComponent, LoadingComponent],
  providers: [DisplayFormatService, DatePipe, CurrencyPipe],

})
export class SharedComponentsModule { }
