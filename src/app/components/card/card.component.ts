import { Component, OnInit, Input } from '@angular/core';
import { ModalShoppingCartComponent } from '../modal-shopping-cart/modal-shopping-cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() productData: any = {};

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef = this.modalService.open(ModalShoppingCartComponent);
    modalRef.componentInstance.productData = this.productData;
  }
}
