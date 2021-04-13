import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() rows: any[] = [];
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<any>();
  
  constructor() {}
  
  public doFilter = (event: KeyboardEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  ngOnInit(): void {
    this.dataSource.data = this.rows;
    this.dataSource.paginator = this.paginator;
  }
}
