import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit, OnChanges {
  
  @Input() dataColumns: any[] = [];
  @Input() dataRows: any[] = []; 
  @Output("onAction") emitter = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() RefreshColumns = new EventEmitter<any>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  infoMessage:string = '';
  
  constructor() {
    
  }
  
  public doFilter = (event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void{

    if(changes && changes.dataRows.currentValue){
      this.infoMessage = 'No se encontraron registros';
      this.dataSource = new MatTableDataSource(this.dataRows);
      this.dataSource.paginator = this.paginator;
    }
  }
  
  
  get keys() {
    let displayedColumns = this.dataColumns.filter(obj => obj.display !== 'hidden').map(({ key }) => key);
    return displayedColumns;
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRows);
    this.infoMessage = 'Cargando...';
  }

  handleEmitter(action_name: string, element: any): void {
    if (action_name === 'edit' || action_name === 'delete'){
      this.emitter.emit(element);
    }else{
      this.emitter.emit(action_name);
    }
  }
}
