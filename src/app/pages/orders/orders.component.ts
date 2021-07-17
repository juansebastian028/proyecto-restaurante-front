import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOrderComponent } from 'src/app/components/modal-order/modal-order.component';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersRows: Order[] = [];
  ordersColumns: any = [
    { key: 'id', display: 'Pedido id' },
    { key: 'user', display: 'Usuario' },
    { key: 'date', display: 'Fecha' },
    { key: 'state', display: 'Estado' },
    {
      key: 'actions',
      display: 'Acciones',
      config: {
        isAction: true,
        actions: [
          {
            class: ['btn', 'btn-info'],
            icon: 'feed',
            name: 'openModal',
          },
        ],
      },
    },
  ];
  user: any;
  profile: any;

  constructor(
    private _auth: AuthService,
    private _order: OrderService,
    private modalService: NgbModal,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.refreshOrders();
  }
  
  openModal(obj: any) {
    if (obj.action === 'openModal') {
      const modalRef = this.modalService.open(ModalOrderComponent);
      this._order.getProductsOrder(obj.element.id).subscribe(
        (data) => {
          modalRef.componentInstance.orderData = data;
          modalRef.componentInstance.eventEmitter.subscribe((event: any) => {
            if (event.action === 'finalize') {
              this._order.finalizeOrder(event.id, event.form).subscribe(
                (data) => {
                  this._snackbar.openSnackBar(
                    'Pedido finalizado exitosamente',
                    'bg-success',
                    'text-white'
                  );
                  modalRef.close();
                  this.refreshOrders();
                },
                (error) => {
                  this._snackbar.openSnackBar(
                    'Ocurrio un error al finalizar el pedido',
                    'bg-warning',
                    'text-white'
                  );
                  console.log(error);
                }
              );
            } else if (event.action === 'cancel') {
              this._order.cancelOrder(event.id, event.form).subscribe(
                (data) => {
                  this._snackbar.openSnackBar(
                    'Pedido cancelado exitosamente',
                    'bg-success',
                    'text-white'
                  );
                  modalRef.close();
                  this.refreshOrders();
                },
                (error) => {
                  this._snackbar.openSnackBar(
                    'Ocurrio un error al cancelar el pedido',
                    'bg-warning',
                    'text-white'
                  );
                  console.log(error);
                }
              );
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  refreshOrders() {
    if (this._auth.isAuthenticated()) {
      this.user = this._auth.getCurrentUser();
      this.profile = this._auth.getCurrentUserProfile();

      if (this.profile.type === 'e-commerce') {
        this.getOrdersByUser(this.user.id);
      } else if (this.profile.type === 'admin') {
        this.getOrdersByBranch(this.user.branch_office_id);
      } else if (this.profile.type === 'super_admin') {
        this.getOrders();
      }
    }
  }

  getOrders() {
    this._order.getOrders().subscribe(
      (data) => {
        this.ordersRows = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrdersByBranch(id: number) {
    this._order.getOrdersByBranch(id).subscribe(
      (data) => {
        this.ordersRows = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getOrdersByUser(id: number) {
    this._order.getOrdersByUser(id).subscribe(
      (data) => {
        this.ordersRows = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
