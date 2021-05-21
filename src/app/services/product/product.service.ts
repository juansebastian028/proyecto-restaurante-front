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
  headers;
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}/products`, { headers: this.headers});
  }

  postProduct(product: any):Observable<Product>{
    return this.http.post<any>(`${this.path}/products`, product, { headers: this.headers});
  }

  putProduct(id:number, product: Product){
    return this.http.put(`${this.path}/products/${id}`, product, {headers: this.headers});
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.path}/products/${id}`, {headers: this.headers});
  }

  getProductsHome(city_id: number):Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(`${this.path}/cities/${city_id}/products`);
  }
}
