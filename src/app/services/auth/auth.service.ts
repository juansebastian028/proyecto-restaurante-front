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

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  login(login:Login[]) {
    return this.http.post(`${this.path}/login`, login);       
  }

  register(register:Register[]) {
    return this.http.post(`${this.path}/register`, register);       
  }
}
