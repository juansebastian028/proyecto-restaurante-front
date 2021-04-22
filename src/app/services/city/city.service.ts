import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../../interfaces/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities():Observable<City[]>{
    return this.http.get<City[]>('http://127.0.0.1:8000/api/cities');
  }
}
