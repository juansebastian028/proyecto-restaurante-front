import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit {

  @Input() public productData:any = {};
  count:number = 1;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  increment(){
    this.count++;
  }

  decrement(){
    if(this.count > 1){
      this.count--;
    }
  }

}
