import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { data } from 'jquery';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headers:any;
  @Input() data:any;

  constructor() {}

  ngOnInit(): void {
  }

}
