import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css', '../shared.css']
})
export class FormLoginComponent implements OnInit {

  public form:FormGroup = new FormGroup({});
  submitted = false;

  constructor(private _auth: AuthService, private router: Router, private fb: FormBuilder) {
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
        this.router.navigate(['']);
        localStorage.setItem('auth_token', data.token);
      });
    }
  }

}
