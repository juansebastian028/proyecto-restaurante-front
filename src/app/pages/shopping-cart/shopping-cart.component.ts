import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shopingCart: ShoppingCart[] = [];
  total: number = 0;

  constructor(private _shoppingCart: ShoppingCartService) { }

  ngOnInit(): void {
    this._shoppingCart.getShoppingCart(1).subscribe((data: ShoppingCart[]) => {
      this.shopingCart = data;
    });
  }

  increaseTotal(price: number, quantity: number){
    this.total += (price * quantity);
  }
}
