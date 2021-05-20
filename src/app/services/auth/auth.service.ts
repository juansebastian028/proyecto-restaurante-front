import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { Register } from 'src/app/interfaces/register';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: string = '';
  currentUserProfile:any;
  currentUser:any;
  token:any;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.initCurrentUser();
  }

  login(login:Login[]) {
    return this.http.post(`${this.path}/login`, login);       
  }

  register(register:Register[]) {
    return this.http.post(`${this.path}/register`, register);       
  }

  initCurrentUser() {
     this.currentUserProfile = JSON.parse(localStorage.getItem('current_user_profile')!);
     this.currentUser = JSON.parse(localStorage.getItem('current_user')!);
     this.token = localStorage.getItem('auth_token');
  }

  getToken(){
    return this.token;
  }

  getCurrentUserProfile(){
    this.initCurrentUser();
    return this.currentUserProfile;
  }

  getCurrentUser(){
    this.initCurrentUser();
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    this.initCurrentUser();
    return (this.getToken() !== null) ? true : false;
  };

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user_profile');
    localStorage.removeItem('current_user');
  }
}
