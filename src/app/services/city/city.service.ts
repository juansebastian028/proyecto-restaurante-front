import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../../interfaces/city';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  path: string = '';
  
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getCities():Observable<City[]>{
    return this.http.get<City[]>(`${this.path}/cities`);
  }
}
