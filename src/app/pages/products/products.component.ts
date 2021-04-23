import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productsRows: any = [
    {
    "Nombre": "Bandeja Paisa",
    "Estado": "Disponible",
    "Precio": 40000
    }
  ];
  
  productsColumns: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
