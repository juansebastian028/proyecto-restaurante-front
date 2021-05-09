import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}/products`);
  }

  getProductsHome():Observable<ProductHome[]>{
    return this.http.get<ProductHome[]>(`${this.path}/products/all`);
  }
}
