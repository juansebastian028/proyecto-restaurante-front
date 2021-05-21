import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderData = {
    name: 'Bandeja Paisa',
    img: 'https://bandejapaisa.us/wp-content/uploads/2016/12/Bandeja-Paisa.jpg',
    price: 15000
  };

  ordersRows: Order[] = [];  
  ordersColumns:any = [
    { key: 'id', display: 'Pedido id' },
    { key: 'user', display: 'Usuario' },
    { key: 'date', display: 'Fecha' },
    { key: 'state', display: 'Estado' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { 
        isAction: true, actions: [
          {
            class:['btn','btn-info'], 
            icon: 'feed',
            name: 'openModal'
          }
        ] 
      },
    },
  ];

  constructor(private _orders: OrderService, private modalService: NgbModal) { }

  openModal(obj: any) {
    console.log(obj);
    if(obj.action === "openModal"){
      const modalRef = this.modalService.open(ModalOrderComponent);
      this._orders.getProductsOrder(obj.element.id).subscribe((data) => {
        modalRef.componentInstance.orderData = data;
      }, (error) => {
        console.log(error)
      });
    }
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this._orders.getOrders().subscribe((data) => {
      this.ordersRows = data;
    }, (error) => {
      console.log(error)
    });
  }

}
