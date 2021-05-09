import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modifier } from 'src/app/interfaces/modifier';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {
  path: string = '';
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }
  
  getModifiers():Observable<Modifier[]>{
    return this.http.get<Modifier[]>(`${this.path}/products/modifiers`);
  }
}
