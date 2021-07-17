import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { HelperToggleService } from '../../services/helper-toggle/helper-toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  class: string = '';
  classSide: string = '';
  isAuthenticated = false;
  totalItemsCart = 0;
  @ViewChild('content') modalCity: any;

  constructor(
    private helper: HelperToggleService,
    private auth: AuthService,
    private router: Router,
    private _shoppingCart: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.helper.customMessage.subscribe((msg) => (this.class = msg));
    this.isAuthenticated = this.auth.isAuthenticated();
    this._shoppingCart.getTotalProducts();
    this._shoppingCart.totalCart.subscribe((data) => {
      this.totalItemsCart = data;
    });
  }

  changeClass() {
    if (this.class === '') {
      this.class = 'toggled';
    } else {
      this.class = '';
    }

    this.helper.changeMessage(this.class);
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
