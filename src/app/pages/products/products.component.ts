import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productsRows: Product[] = [];
  
  productsColumns = [
    { key: 'id', display: 'Producto id' },
    { key: 'name', display: 'Nombre' },
    { key: 'price', display: 'Precio' },
    { key: 'category', display: 'Categoria' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._product.getProducts().subscribe(data => {
      this.productsRows = data;
    });
  }

  postProduct(dataForm: Product){
    this._product.postProduct(dataForm).subscribe(data => {
      if(data){
        alert("Producto guardado Exitosamente");
        this.getProducts();
      } else {
        console.log(data);
      }
    });
  }

  selectAction(data: any){
    console.log(data);
  }

}
