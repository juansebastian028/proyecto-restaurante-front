import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css', '../shared.css']
})
export class FormRegisterComponent implements OnInit {

  public form:FormGroup = new FormGroup({});
  submitted = false;
  branches:BranchOffice[] = [];
  
  constructor(private _auth: AuthService, private router: Router, private fb: FormBuilder, private _shoppingCart: ShoppingCartService, private _branch: BranchOfficeService) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      branch_office_id: new FormControl(''),
      password: new FormControl('', [Validators.required]),
     });
  }
  
  
  ngOnInit(): void {
    this._branch.getBranches().subscribe(data => {
      this.branches =  data;

      if(this.branches.length){
        this.form.controls['branch_office_id'].setValue(this.branches[0].id, {onlySelf: true});
      }
    });     
  }
  
  onFormSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      let formRegister = {...this.form.value, profile_id:3};
      this._auth.register(formRegister).subscribe((data:any) =>{
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('current_user_profile', JSON.stringify(data.profile));
        localStorage.setItem('current_user', JSON.stringify(data.user));
        if(data.user.city_id){
          localStorage.setItem('selected_city', JSON.stringify(data.user.city_id));
        }
        this._shoppingCart.addShoppingCartLocal();
        this.router.navigate(['']);
      });
    }
  }
}

