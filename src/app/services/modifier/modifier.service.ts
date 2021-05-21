import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modifier } from 'src/app/interfaces/modifier';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {
  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getModifiers():Observable<Modifier[]>{
    return this.http.get<Modifier[]>(`${this.path}/products/modifiers`, {headers: this.headers});
  }

  postModifier(modifier: Modifier):Observable<Modifier>{
    return this.http.post<Modifier>(`${this.config.path}/products/modifiers`, modifier, { headers: this.headers });
  }

  putModifier(id:number, modifier: Modifier){
    return this.http.put(`${this.path}/products/modifiers/${id}`, modifier, {headers: this.headers});
  }

  getModifierGroups():any{
    return this.http.get(`${this.path}/products/group-modifiers`, {headers: this.headers});
  }
}
