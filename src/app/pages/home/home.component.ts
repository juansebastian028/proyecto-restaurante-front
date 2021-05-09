import { Component, OnInit } from '@angular/core';
import { ProductHome } from 'src/app/interfaces/product-home';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductHome[] = []; 

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this._product.getProductsHome().subscribe(data => {
      this.products =  data;
    });
  }

}
