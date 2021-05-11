import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  @Input() city:any = {};
  @Output() saveCity = new EventEmitter<any>();

  public form:FormGroup = new FormGroup({});
  submitted = false;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
     name: new FormControl('', [Validators.required]),
    });
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.saveCity.emit(this.form.value);
    }
  }

}
