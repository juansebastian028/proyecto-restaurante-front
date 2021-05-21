import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css', '../shared.css']
})
export class FormRegisterComponent implements OnInit {

  public form:FormGroup = new FormGroup({});
  submitted = false;
  
  constructor(private _auth: AuthService, private router: Router, private fb: FormBuilder, private _shoppingCart: ShoppingCartService) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     });
  }
  
  
  ngOnInit(): void {
  }
  
  onFormSubmit() {
    this.submitted = true;
    if(this.form.valid) {
      let formRegister = {...this.form.value, profile_id:3};
      this._auth.register(formRegister).subscribe((data:any) =>{
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('current_user_profile', JSON.stringify(data.profile));
<<<<<<< HEAD
        localStorage.setItem('current_user', JSON.stringify(data.user));
        this._shoppingCart.addShoppingCartLocal();
=======
        this.router.navigate(['']);
>>>>>>> 5994e7a6a049546a9a3113ccc38c9a8c25ae82f7
      });
    }
  }
}

