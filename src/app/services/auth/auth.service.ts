import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/login';
import { Register } from 'src/app/interfaces/register';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = '';
  currentUserProfile: any;
  currentUser: any;
  token: any;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.initCurrentUser();
  }

  initCurrentUser() {
    this.currentUserProfile = JSON.parse(
      localStorage.getItem('current_user_profile')!
    );
    this.currentUser = JSON.parse(localStorage.getItem('current_user')!);
    this.token = localStorage.getItem('auth_token');
  }

  login(login: Login[]) {
    return this.http.post(`${this.path}/login`, login);
  }

  register(register: Register[]) {
    return this.http.post(`${this.path}/register`, register);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user_profile');
    localStorage.removeItem('current_user');
  }

  isAuthenticated(): boolean {
    this.initCurrentUser();
    return this.getToken() !== null ? true : false;
  }

  isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }

    const currentProfile = JSON.parse(
      localStorage.getItem('current_user_profile')!
    );
    return allowedRoles.includes(currentProfile?.type);
  }

  getToken() {
    return this.token;
  }

  getCurrentUserProfile() {
    this.initCurrentUser();
    return this.currentUserProfile;
  }

  getCurrentUser() {
    this.initCurrentUser();
    return this.currentUser;
  }
}
