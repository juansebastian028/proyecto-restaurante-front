import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModifierGroups } from 'src/app/interfaces/modifier-groups';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModifierGroupsService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getModifierGroups():Observable<ModifierGroups[]>{
    return this.http.get<ModifierGroups[]>(`${this.path}/products/group-modifiers`, {headers: this.headers});
  }

  postModifierGroups(data: ModifierGroups):Observable<ModifierGroups[]>{
    return this.http.post<ModifierGroups[]>(`${this.config.path}/products/group-modifiers`, data, { headers: this.headers });
  }

}
