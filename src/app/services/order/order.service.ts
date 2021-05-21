import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { Order } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders`, {headers: this.headers});
  }

  getProductsOrder(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/products/${id}`, {headers: this.headers});
  }

  getOrdersByUser(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/user/${id}`, {headers: this.headers});
  }

  getOrdersByBranch(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/user/${id}`, {headers: this.headers});
  }

  payOrder(order: Order[]) {
    return this.http.post<Order>(`${this.path}/orders`, order, {headers: this.headers});
  }
}
