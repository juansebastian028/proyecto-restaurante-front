import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css'],
})
export class SearchProductsComponent implements OnInit {
  @Output() eventEmmiter = new EventEmitter();
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.form.valid) this.eventEmmiter.emit(this.form.value);
  }
}
