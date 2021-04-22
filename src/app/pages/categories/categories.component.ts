import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesRows: Category[] = [];
  
  categoriesColumns = [
    { key: 'id', display: 'Categoria id' },
    { key: 'name', display: 'Nombre' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit'}] 
      },
    },
  ];

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(data => {
      this.categoriesRows = data;
    });
  }

}
