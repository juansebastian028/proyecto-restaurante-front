import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit {

  @Input() public productData:any = {};
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.productData);
  }

}
