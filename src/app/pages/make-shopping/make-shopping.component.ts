import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-make-shopping',
  templateUrl: './make-shopping.component.html',
  styleUrls: ['./make-shopping.component.css']
})
export class MakeShoppingComponent implements OnInit {

  isLogged: boolean = false;
  user: any;
  public form:FormGroup = new FormGroup({});
  submitted = false;

  constructor(private _order: OrderService, private _auth: AuthService, private fb: FormBuilder, private router: Router, private _snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      phone_number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
     });

     this.isLogged = this._auth.isAuthenticated();
     this.user = this._auth.getCurrentUser();
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.form.addControl('user_id', this.fb.control(this.user.id));
      this.form.addControl('branch_id', this.fb.control(this.user.brach_id));
      this.form.addControl('shopping_cart_ids', this.fb.control(JSON.parse(localStorage.getItem('payShoppingCart')!)));
      this._order.payOrder(this.form.value).subscribe((data) => {
        localStorage.removeItem('payShoppingCart');
        this._snackbar.openSnackBar('Pedido realizado exitosamente', 'bg-success','text-white');
        this.router.navigate(['']);
      }, (error) => {
        console.log(error);
      });
    }
  }

}
