import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string = '';
  constructor(private http: HttpClient) { }

  login(login:Login[]) {
    return this.http.post('http://127.0.0.1:8000/api/login', login);       
  }
}
