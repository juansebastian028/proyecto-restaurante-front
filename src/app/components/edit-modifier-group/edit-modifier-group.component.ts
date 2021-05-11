import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-modifier-group',
  templateUrl: './edit-modifier-group.component.html',
  styleUrls: ['./edit-modifier-group.component.css']
})
export class EditModifierGroupComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  public form:FormGroup = new FormGroup({});

  submitted = false;
  categories: Category[] = [];
  default = 1;

  constructor(private fb: FormBuilder, private _category: CategoryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
     name: new FormControl('', [Validators.required]),
     selection_type: new FormControl('U', [Validators.required]),
     category_id: new FormControl('', [Validators.required]),
    });

    this._category.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this.form.get('category_id')?.setValue(this.default, {onlySelf: true});
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.eventEmitter.emit(this.form.value);
    }
  }

}
