import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modifier } from 'src/app/interfaces/modifier';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ModifierService {
  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    });
  }

  getModifiers(): Observable<Modifier[]> {
    return this.http.get<Modifier[]>(`${this.path}/products/modifiers`, {
      headers: this.getHeaders(),
    });
  }

  postModifier(modifier: Modifier): Observable<Modifier> {
    return this.http.post<Modifier>(
      `${this.config.path}/products/modifiers`,
      modifier,
      { headers: this.getHeaders() }
    );
  }

  putModifier(id: number, modifier: Modifier) {
    return this.http.put(`${this.path}/products/modifiers/${id}`, modifier, {
      headers: this.getHeaders(),
    });
  }

  deleteModifier(id: number) {
    return this.http.delete(`${this.path}/products/modifiers/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
