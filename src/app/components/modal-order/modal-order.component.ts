import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.css'],
})
export class ModalOrderComponent implements OnInit {
  order: any;
  @Input()
  set orderData(val: any) {
    this.order = val;

    this.order.products.forEach((product: any) => {
      this.increaseTotal(product.pivot.unit_price, product.pivot.quantity);
      product?.category?.modifier_groups.forEach((modifierGroup: any) => {
        modifierGroup?.modifiers.forEach((modifier: any) => {
          this.increaseTotal(
            modifier.unit_price_modifier,
            product.pivot.quantity
          );
        });
      });
    });
  }
  @Output() eventEmitter = new EventEmitter();
  profile: any;
  user: any;
  isCancelled: boolean = false;
  total: number = 0;

  public form: FormGroup = new FormGroup({});

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    public activeModal: NgbActiveModal
  ) {
    this.form = this.fb.group({
      cancellation_description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.profile = this._auth.getCurrentUserProfile();
    this.user = this._auth.getCurrentUser();
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.eventEmitter.emit({
        id: this.order.id,
        form: this.form.value,
        action: 'cancel',
      });
    }
  }

  finalizeOrder() {
    this.eventEmitter.emit({
      id: this.order.id,
      form: { state: 'F' },
      action: 'finalize',
    });
  }

  cancelOrder() {
    this.isCancelled = true;
  }

  increaseTotal(price: number, quantity: number) {
    this.total += price * quantity;
  }
}
