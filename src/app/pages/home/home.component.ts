import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { ProductHome } from 'src/app/interfaces/product-home';
import { ProductService } from 'src/app/services/product/product.service';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductHome[] = []; 
  categories: Category[] = [];
  city_id:number = 1;

  constructor(private _product: ProductService, private _category: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(){
    this._category.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getProductsByCity(city_id:number){
    this.city_id = city_id;
    this._product.getProductsHome(city_id).subscribe(data =>{
      this.products = data;
    })
  }

  showProductsByCategory(category: Category){
    this._category.getProductsByCategory(this.city_id, category.id).subscribe(data => {
      this.products = data;
    })
  }

}
