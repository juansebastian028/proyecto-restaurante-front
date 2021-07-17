import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { City } from 'src/app/interfaces/city';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css'],
})
export class EditCityComponent implements OnInit {
  @Input() city!: City;
  @Output() saveCity = new EventEmitter<any>();
  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      id: this.city.id || -1,
      name: this.city.name || '',
    });
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.saveCity.emit(this.form.value);
    }
  }
}
