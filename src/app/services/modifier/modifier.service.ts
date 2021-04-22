import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modifier } from 'src/app/interfaces/modifier';

@Injectable({
  providedIn: 'root'
})
export class ModifierService {

  constructor(private http: HttpClient) { }

  getModifiers():Observable<Modifier[]>{
    return this.http.get<Modifier[]>('http://127.0.0.1:8000/api/modifiers');
  }
}
