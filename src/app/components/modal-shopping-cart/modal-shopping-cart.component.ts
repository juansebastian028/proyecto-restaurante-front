import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit {

  @Input() public productData:any = {};

  count:number = 1;
  user: any;
  public form:FormGroup = new FormGroup({});

  constructor(private _shoppingCart: ShoppingCartService, private _auth: AuthService, public activeModal: NgbActiveModal, private fb: FormBuilder, private _snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      product_id: this.productData?.id,
      product: this.productData?.name,
      image: this.productData?.img,
      price: this.productData?.price,
      quantity: new FormControl(''),
      multiple: this.fb.array([]),
     });

     this.user = this._auth.getCurrentUser();
  }

  increment(){
    this.count++;
  }

  decrement(){
    if(this.count > 1){
      this.count--;
    }
  }

  addRadio(name: string){
    this.form.addControl(name, this.fb.control(null));
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('multiple') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onFormSubmit(){
    this.form.get('quantity')?.setValue(this.count);
    if(this.form.valid){
      if(this._auth.isAuthenticated()){
        this.form.addControl('user_id', this.fb.control(this.user.id));
        this._shoppingCart.addShoppingCart(this.form.value).subscribe((data) => {
          this._snackbar.openSnackBar('Producto agregado al carrito','bg-success','text-white');
          this.activeModal.close();
        }, (error) => {
          if (!error.ok){
            this._snackbar.openSnackBar('Ocurrio un error al agregar al carrito','bg-danger','text-white');
          }
          console.log(error);
        });
      }else{
        this._shoppingCart.addItemLocal(this.form.value);

        this._snackbar.openSnackBar('Producto agregado al carrito','bg-success','text-white');
        this.activeModal.close();
      }
    }
  }
}
