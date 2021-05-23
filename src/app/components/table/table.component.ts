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
  @Input() isBtnAddRequired: boolean = true;
  @Output("onAction") emitter = new EventEmitter();
  @Output() add = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  isLoading:boolean = false;
  
  constructor() {
    
  }
  
  public doFilter = (event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void{

    if(changes.dataRows && !changes.dataRows.isFirstChange()){
      this.dataSource = new MatTableDataSource(this.dataRows);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    }else{
      this.isLoading = true;
    }
  }
  
  
  get keys() {
    let displayedColumns = this.dataColumns.filter(obj => obj.display !== 'hidden').map(({ key }) => key);
    return displayedColumns;
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataRows);
  }

  handleEmitter(action: string, element: any): void {
    this.emitter.emit({action, element});
  }
}
