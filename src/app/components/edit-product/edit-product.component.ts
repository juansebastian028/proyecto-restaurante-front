import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { Category } from 'src/app/interfaces/category';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  @Output() saveProduct = new EventEmitter<object>();
  @Input() product: any;
  form: FormGroup = new FormGroup({});
  categories: Category[] = [];
  branches: BranchOffice[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private _category: CategoryService,
    private _branchOffice: BranchOfficeService
  ) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      img: '',
      category_id: new FormControl('', [Validators.required]),
      branches_ids: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        this.form.setValue({
          id: this.product.id || -1,
          name: this.product.name || '',
          price: this.product.price || '',
          img: '',
          category_id: this.product.category_id || this.categories[0].id,
          branches_ids: this.product.branches
            ? this.product.branches.map((obj: { id: number }) => obj.id)
            : '',
        });
      },
      (error) => {
        console.log(error);
      }
    );

    this._branchOffice.getBranches().subscribe(
      (data) => {
        this.branches = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.validateRequiredImage();
  }

  validateRequiredImage() {
    if (this.product.img) {
      this.form.get('img')?.clearValidators();
    } else {
      this.form.get('img')?.setValidators(Validators.required);
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ img: file });
    }
  }

  onFormSubmit() {
    this.submitted = true;
    const formDataProduct = new FormData();
    formDataProduct.append('name', this.form.get('name')?.value);
    formDataProduct.append('price', this.form.get('price')?.value);
    formDataProduct.append('img', this.form.get('img')?.value);
    formDataProduct.append('category_id', this.form.get('category_id')?.value);
    formDataProduct.append(
      'branches_ids',
      JSON.stringify(this.form.get('branches_ids')?.value)
    );

    if (this.form.valid) {
      this.saveProduct.emit({
        id: this.form.get('id')?.value,
        formDataProduct,
      });
    }
  }
}
