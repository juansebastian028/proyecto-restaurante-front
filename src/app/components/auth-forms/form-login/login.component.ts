import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css', '../shared.css']
})
export class FormLoginComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }
  login:Login[] = [];
  ngOnInit(): void {
  }

  onFormSubmit(f: NgForm) {
    this.login = f.value;
    this._auth.login(this.login).subscribe((data:any) =>{
      this.router.navigate(['']);
      localStorage.setItem('auth_token', data.token);
    });
  }

}
