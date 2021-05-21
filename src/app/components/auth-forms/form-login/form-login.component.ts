import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css', '../shared.css']
})
export class FormLoginComponent implements OnInit {

  public form:FormGroup = new FormGroup({});
  submitted = false;

  constructor(private _auth: AuthService, private fb: FormBuilder, private router: Router, private _snackbar: SnackbarService) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     });
  }
  
  ngOnInit(): void {
  }

  onFormSubmit() {
    this.submitted = true;
    if(this.form.valid){
      this._auth.login(this.form.value).subscribe((data:any) =>{
      
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('current_user_profile', JSON.stringify(data.profile));
        this.router.navigate(['']);
        
      },(error)=>{
        if (!error.ok){
          this._snackbar.openSnackBar('Usuario o contraseña incorrectas','bg-danger','text-white');
        }
      });

    }
  }
}


