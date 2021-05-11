import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();
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
      this.eventEmitter.emit(this.form.value);
    }
  }


}
