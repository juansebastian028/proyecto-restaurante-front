import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModifierGroup } from 'src/app/interfaces/modifier-group';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModifierGroupService {

  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders(){
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }
  
  getModifierGroups():Observable<ModifierGroup[]>{
    return this.http.get<ModifierGroup[]>(`${this.path}/products/group-modifiers`, {headers: this.getHeaders()});
  }

  postModifierGroup(modifierGroup: ModifierGroup):Observable<ModifierGroup>{
    return this.http.post<ModifierGroup>(`${this.config.path}/products/group-modifiers`, modifierGroup, { headers: this.getHeaders() });
  }

  putModifierGroup(id:number, modifierGroup: ModifierGroup){
    return this.http.put(`${this.path}/products/group-modifiers/${id}`, modifierGroup, {headers: this.getHeaders()});
  }

  deleteModifierGroup(id:number){
    return this.http.delete(`${this.path}/products/group-modifiers/${id}`, {headers: this.getHeaders()});
  }

}
