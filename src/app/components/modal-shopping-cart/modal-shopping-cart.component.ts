import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit {

  @Input() public productData:any = {};

  count:number = 1;
  public form:FormGroup = new FormGroup({});

  constructor(private _shoppingCart: ShoppingCartService, public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      product_id: this.productData?.id,
      quantity: new FormControl(''),
      multiple: this.fb.array([]),
     });
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
      this._shoppingCart.addShoppingCart(this.form.value).subscribe((data) => {
        console.log(data);
      });
    }else{
      console.log("No")
    }
  }

}
