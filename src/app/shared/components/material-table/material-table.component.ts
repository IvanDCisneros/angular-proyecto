import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TableElement } from '../../../shared/models/columnas-tabla.model';
import { DisplayFormatService } from '../../../shared/services/display-format.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {

  @Input()
  tableContentMap!: TableElement[];
  displayedColumns!: string[];

  @Input() dataSource!: Object[];
  @Input() actions: string[] = [];
  @Input() nombreAcciones: string = "Acciones";

  @Output() addClicked = new EventEmitter();
  @Output() removeClicked = new EventEmitter();
  @Output() detailClicked = new EventEmitter();

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  mostrarPaginacion: boolean = true;
  pageSizeOptions = [5, 10, 15];

  pageEvent!: PageEvent;

  startIndex: number = 0;
  endIndex: number = 5;

  constructor(
    private displayFormatService: DisplayFormatService) { }

  ngOnInit(): void {

    if (this.dataSource && this.dataSource.length > 0) {
      this.length = this.dataSource.length;
      if(this.length < 5)
        this.mostrarPaginacion = false;
    }
    
    this.displayedColumns = [
      ...this.tableContentMap.map(tableElement => tableElement.propName)
    ];

    if (this.actions.length > 0) {
      this.displayedColumns.push("actions");
    }
  }

  getDisplayFormat(dataElement: { [index: string]: any }, tableElement: TableElement) {
    const value = dataElement[tableElement.propName];
    const format = tableElement.format as string;
    return this.displayFormatService.getDisplayFormat(value, format);
  }

  onClickAdd(dataElement: Object) {
    this.addClicked.emit(dataElement);
  }

  onClickRemove(dataElement: Object) {
    this.removeClicked.emit(dataElement);
  }

  onClickDetail(dataElement: Object) {
    this.detailClicked.emit(dataElement);
  }

  handlePageEvent(e: PageEvent) {
    this.startIndex = e.pageIndex * e.pageSize;
    this.endIndex = this.startIndex + e.pageSize;
    if (this.endIndex > this.length) {
      this.endIndex = this.length;
    }
  }
}
