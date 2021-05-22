import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config/config.service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders(){
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.path}/users`, {headers: this.getHeaders()});
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.path}/users/${id}`, {headers: this.getHeaders()});
  }

  postUser(user: User):Observable<User>{
    return this.http.post<User>(`${this.path}/users`, user, {headers: this.getHeaders()});
  }

  putUser(id:number, user: User){
    return this.http.put(`${this.path}/users/${id}`, user, {headers: this.getHeaders()});
  }

  deleteUser(id:number){
    return this.http.delete(`${this.path}/users/${id}`, {headers: this.getHeaders()});
  }
}
