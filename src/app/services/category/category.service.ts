import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { ProductHome } from 'src/app/interfaces/product-home';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.config.path}/products/categories`);
  }

  postCategory(category: Category):Observable<Category>{
    return this.http.post<Category>(`${this.config.path}/products/categories`, category, { headers: this.headers });
  }

  putCategory(id:number, category: Category){
    return this.http.put(`${this.path}/products/categories/${id}`, category, {headers: this.headers});
  }

  getProductsByCategory(city_id:number, category_id:number){
    return this.http.get<ProductHome[]>(`${this.config.path}/cities/${city_id}/categories/${category_id}/products`);
  }
}
