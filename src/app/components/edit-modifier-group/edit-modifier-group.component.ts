import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-modifier-group',
  templateUrl: './edit-modifier-group.component.html',
  styleUrls: ['./edit-modifier-group.component.css'],
})
export class EditModifierGroupComponent implements OnInit {
  @Output() saveModifierGroup = new EventEmitter();
  @Input() modifierGroup: any;
  form: FormGroup = new FormGroup({});
  categories: Category[] = [];
  submitted = false;

  constructor(private fb: FormBuilder, private _category: CategoryService) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      selection_type: new FormControl('U', [Validators.required]),
      category_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.form.setValue({
          id: this.modifierGroup.id || -1,
          name: this.modifierGroup.name || '',
          selection_type: this.modifierGroup.selection_type || 'U',
          category_id: this.modifierGroup.category_id || this.categories[0].id,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.saveModifierGroup.emit(this.form.value);
    }
  }
}
