import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }

  getShoppingCart(id: number):Observable<ShoppingCart[]>{
    return this.http.get<ShoppingCart[]>(`${this.path}/shopping-cart/user/${id}`, {headers: this.headers});
  }

  addShoppingCart(shoppingcart: ShoppingCart[]) {
    return this.http.post<ShoppingCart>(`${this.path}/shopping-cart`, shoppingcart, {headers: this.headers});
  }
}
