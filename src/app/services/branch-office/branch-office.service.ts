import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchOffice } from 'src/app/interfaces/branch-office';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  constructor(private http: HttpClient) { }

  getBranches():Observable<BranchOffice[]>{
    return this.http.get<BranchOffice[]>('http://127.0.0.1:8000/api/branches');
  }
}
