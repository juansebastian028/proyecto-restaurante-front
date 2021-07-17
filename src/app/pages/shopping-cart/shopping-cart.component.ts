import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { ShoppingCartProduct } from 'src/app/interfaces/shopping-cart';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartProducts: ShoppingCartProduct[] = [];
  total: number = 0;
  user: any;

  constructor(
    private _shoppingCart: ShoppingCartService,
    private router: Router,
    public _auth: AuthService,
    private _snackbar: SnackbarService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.total = 0;
    if (this._auth.isAuthenticated()) {
      this.user = this._auth.getCurrentUser();

      this._shoppingCart.getShoppingCart(this.user.id).subscribe(
        (data: ShoppingCartProduct[]) => {
          this.shoppingCartProducts = data;
          this.shoppingCartProducts.find((item: any) => {
            this.total += item.price * item.quantity;
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      if (this._shoppingCart.getItemsLocal() !== null) {
        this.shoppingCartProducts = this._shoppingCart.getItemsLocal();
        this.shoppingCartProducts.find((item: any) => {
          this.total += item.price * item.quantity;
        });
      } else {
        this.shoppingCartProducts = [];
      }
    }
  }

  removeItem(id: number, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.data = { name };
    modalRef.componentInstance.modalRef = modalRef;

    modalRef.componentInstance.eventEmitter.subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        if (this._auth.isAuthenticated()) {
          this._shoppingCart.deleteShoppingCart(id).subscribe(
            (data) => {
              this._snackbar.openSnackBar(
                'Producto eliminado exitosamente',
                'bg-success',
                'text-white'
              );
              this.getShoppingCart();
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          this._shoppingCart.removeItemLocal(id);
          this.getShoppingCart();
          this._snackbar.openSnackBar(
            'Producto eliminado exitosamente',
            'bg-success',
            'text-white'
          );
        }
        this._shoppingCart.getTotalProducts();
      }
    });
  }

  payShoppingCart() {
    if (this._auth.isAuthenticated()) {
      localStorage.setItem(
        'payShoppingCart',
        JSON.stringify(this.shoppingCartProducts)
      );
      this.router.navigate(['/make-shopping']);
    } else {
      this._snackbar.openSnackBar(
        'Debes iniciar sesión para continuar con la compra',
        'bg-warning',
        'text-white'
      );
    }
  }
}
