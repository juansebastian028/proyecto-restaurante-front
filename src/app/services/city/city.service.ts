import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../../interfaces/city';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    });
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.path}/cities`);
  }

  postCity(city: City): Observable<City> {
    return this.http.post<City>(`${this.path}/cities`, city, {
      headers: this.getHeaders(),
    });
  }

  putCity(id: number, city: City) {
    return this.http.put(`${this.path}/cities/${id}`, city, {
      headers: this.getHeaders(),
    });
  }

  deleteCity(id: number) {
    return this.http.delete(`${this.path}/cities/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
