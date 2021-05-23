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
  selectedCity:any;
  page:number = 1;
  pageSize:number = 8;

  constructor(private _product: ProductService, private _category: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
    if(localStorage.getItem('selected_city')){
      this.selectedCity = localStorage.getItem('selected_city');
      this.getAllProductsByCity(JSON.parse(this.selectedCity));
    }
  }
  
  getCategories(){
    this._category.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getAllProductsByCity(city_id:number){
    if (localStorage.getItem('selected_city') === null){
      localStorage.setItem('selected_city', JSON.stringify(city_id));
    }
    this.selectedCity = city_id;
    this._product.getAllProductsHome(this.selectedCity).subscribe(data =>{
      this.products = data;
    });
  }

  onPageChange(page:number){
    this.page = page;
  }

  showProductsByCategory(category: Category){
    this._category.getProductsByCategory(this.selectedCity, category.id).subscribe(data => {
      this.products = data;
    })
  }

  getSearchProducts(search: any){
    this._product.getSearchProducts(this.selectedCity, search).subscribe(data =>{
      this.products = data;
    });
  }

}
