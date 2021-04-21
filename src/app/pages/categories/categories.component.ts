import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesRows: [] = [];
  
  categoriesColumns:any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
