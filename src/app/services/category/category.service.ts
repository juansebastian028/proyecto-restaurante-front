import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.config.path}/products/categories`);
  }

  postCategories(data: Category):Observable<Category[]>{
    return this.http.post<Category[]>(`${this.config.path}/products/categories`, data, { headers: this.headers });
  }
}
