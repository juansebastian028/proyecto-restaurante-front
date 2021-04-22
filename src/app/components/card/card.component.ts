import { Component, OnInit } from '@angular/core';
import { ModalShoppingCartComponent } from '../modal-shopping-cart/modal-shopping-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  productData = {
    name: 'Bandeja Paisa',
    img: 'https://bandejapaisa.us/wp-content/uploads/2016/12/Bandeja-Paisa.jpg',
    price: 15000
  };
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(){
    const modalRef = this.modalService.open(ModalShoppingCartComponent);
    modalRef.componentInstance.productData = this.productData;
  }
}
