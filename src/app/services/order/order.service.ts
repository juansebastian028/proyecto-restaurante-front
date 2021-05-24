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

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders(){
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders`, {headers: this.getHeaders()});
  }

  getProductsOrder(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/products/${id}`, {headers: this.getHeaders()});
  }

  getOrdersByUser(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/user/${id}`, {headers: this.getHeaders()});
  }

  getOrdersByBranch(id: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.path}/orders/branch/${id}`, {headers: this.getHeaders()});
  }

  payOrder(order: Order[]) {
    return this.http.post<Order>(`${this.path}/orders`, order, {headers: this.getHeaders()});
  }

  cancelOrder(id:number, order: Order[]) {
    return this.http.put<Order>(`${this.path}/orders/cancelOrder/${id}`, order, {headers: this.getHeaders()});
  }

  finalizeOrder(id: number, order: any) {
    return this.http.put<Order>(`${this.path}/orders/finalizeOrder/${id}`, order, {headers: this.getHeaders()});
  }
}
