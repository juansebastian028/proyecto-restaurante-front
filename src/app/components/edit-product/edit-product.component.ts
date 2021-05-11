import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { Category } from 'src/app/interfaces/category';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  public form:FormGroup = new FormGroup({});

  submitted = false;
  categories: Category[] = [];
  branches: BranchOffice[] = [];
  default = 1;

  constructor(private fb: FormBuilder, private _category: CategoryService, private _branchOffice: BranchOfficeService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
     name: new FormControl('', [Validators.required]),
     state: new FormControl('A', [Validators.required]),
     price: new FormControl('', [Validators.required]),
     img: new FormControl('', [Validators.required]),
     category_id: new FormControl('', [Validators.required]),
     branches_ids: new FormControl('', [Validators.required]),
    });

    this._category.getCategories().subscribe((data: any) => {
      this.categories = data;
    });

    this._branchOffice.getBranches().subscribe((data: any) => {
      this.branches = data;
    });

    this.form.get('category_id')?.setValue(this.default, {onlySelf: true});
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        this.form.patchValue({
          img: file
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onFormSubmit(){
    this.submitted = true;
    const formData = new FormData();

    formData.append('name', this.form.get('name')?.value);
    formData.append('state', this.form.get('state')?.value);
    formData.append('price', this.form.get('price')?.value);
    formData.append('img', this.form.get('img')?.value);
    formData.append('category_id', this.form.get('category_id')?.value);
    formData.append('branches_ids', this.form.get('branches_ids')?.value);

    if(this.form.valid){
      this.eventEmitter.emit(formData);
    }
  }

}
