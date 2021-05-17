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
  selectedCity: any = "";
  city_id:number = 1;

  constructor(private _product: ProductService, private _category: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
    if(localStorage.getItem('selcetedCity')){
      this.selectedCity = localStorage.getItem('selcetedCity');
      this.getProductsByCity(JSON.parse(this.selectedCity));
    }
  }
  
  getCategories(){
    this._category.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getProductsByCity(city_id:number){
    localStorage.setItem('selcetedCity', JSON.stringify(city_id));
    this._product.getProductsHome(city_id).subscribe(data =>{
      this.products = data;
    })
  }

  showProductsByCategory(category: Category){
    this._category.getProductsByCategory(this.selectedCity, category.id).subscribe(data => {
      this.products = data;
    })
  }

}
