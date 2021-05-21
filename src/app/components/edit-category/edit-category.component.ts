import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Output() saveCategory = new EventEmitter();
  @Input() category !: Category;
  public form:FormGroup = new FormGroup({});

  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
     });
  }

  ngOnInit(): void {
    this.form.setValue({
      id: this.category.id || -1,
      name: this.category.name || '',
    });
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.saveCategory.emit(this.form.value);
    }
  }

}
