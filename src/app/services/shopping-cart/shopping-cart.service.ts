import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  path: string = '';
  user: any;
  private countCart = new BehaviorSubject<number>(0);
  public totalCart = this.countCart.asObservable();

  constructor(private _auth: AuthService, private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders(){
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }

  getShoppingCart(id: number):Observable<ShoppingCart[]>{
    return this.http.get<ShoppingCart[]>(`${this.path}/shopping-cart/user/${id}`, {headers: this.getHeaders()});
  }

  addShoppingCart(shoppingcart: ShoppingCart[]) {
    return this.http.post<ShoppingCart>(`${this.path}/shopping-cart`, shoppingcart, {headers: this.getHeaders()});
  }

  deleteShoppingCart(id: number){
    return this.http.delete(`${this.path}/shopping-cart/${id}`, {headers: this.getHeaders()});
  }

  addShoppingCartLocal(){
    if(this._auth.isAuthenticated()){
      this.user = this._auth.getCurrentUser();

      let shoppingCart = this.getItemsLocal();

      if(shoppingCart !== null){
        for(let i = 0; i < shoppingCart.length; i++){
          shoppingCart[i].user_id = this.user.id;
          this.addShoppingCart(shoppingCart[i]).subscribe((data) => {
            console.log(data)
          }, (error) => {
            console.log(error);
          });
        }
        localStorage.removeItem('shoppingCart');
      }
    }
  }

  getItemsLocal(){
    return JSON.parse(localStorage.getItem('shoppingCart')!);
  }

  addItemLocal(data: any){
    let shoppingCart = this.getItemsLocal();

    if(shoppingCart == null){
      shoppingCart = [data];
    }else{
      shoppingCart.push(data);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }

  removeItemLocal(id: number){
    let shoppingCart = this.getItemsLocal();

    if(shoppingCart !== null){
      shoppingCart = shoppingCart.filter((item: any) => item.product_id !== id );
      localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    }
  }

  getTotalProducts() {
    if(this._auth.isAuthenticated()){
      this.user = this._auth.getCurrentUser();

      this.getShoppingCart(this.user.id).subscribe((data) => {
        this.countCart.next(data.length);
      });

    } else {
      let shoppingCart = this.getItemsLocal();
      if (shoppingCart !== null){
        this.countCart.next(shoppingCart.length);
      }
    }
  }
}
