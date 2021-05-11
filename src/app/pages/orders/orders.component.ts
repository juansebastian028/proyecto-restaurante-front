import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';

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

  ordersRows: any = [
    {
      "id": 1, 
      "userName": "John Helmer Valencia",
      "date": "2021-04-23",
      "state": "Finalizado"
    },
    {
      "id": 2, 
      "userName": "Esteban Medina",
      "date": "2021-04-19",
      "state": "Finalizado"
    },{
      "id": 3, 
      "userName": "Larry Vermudez",
      "date": "2021-04-20",
      "state": "Finalizado"
    },{
      "id": 4, 
      "userName": "Pepe Mendez",
      "date": "2021-04-21",
      "state": "Cancelado"
    }
  ];
  
  ordersColumns:any = [
    { key: 'id', display: 'Pedido id' },
    { key: 'userName', display: 'Usuario' },
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

  openModal(action: any) {
    if(action === "openModal"){
      const modalRef = this.modalService.open(ModalOrderComponent);
      modalRef.componentInstance.orderData = this.orderData;
    }
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

}
