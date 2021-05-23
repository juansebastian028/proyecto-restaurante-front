import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductHome } from 'src/app/interfaces/product-home';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders(){
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}/products`, { headers: this.getHeaders()});
  }

  postProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.path}/products`, product, { headers: this.getHeaders()});
  }

  putProduct(id:number, product: Product){
    return this.http.post(`${this.path}/products/${id}`, product, {headers: this.getHeaders()});
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.path}/products/${id}`, {headers: this.getHeaders()});
  }

  getAllProductsHome(city_id: number):Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(`${this.path}/cities/${city_id}/products`);
  }

  getSearchProducts(city_id: number, search: any):Observable<ProductHome[]>{
    return this.http.post<ProductHome[]>(`${this.path}/cities/${city_id}/products`, search);
  }
}
