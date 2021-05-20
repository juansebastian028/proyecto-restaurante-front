import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { Product } from 'src/app/interfaces/product';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  path: string = '';
  headers;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("auth_token")});
  }

  getBranches():Observable<BranchOffice[]>{
    return this.http.get<BranchOffice[]>(`${this.path}/branches`, {headers: this.headers});
  }

  getProductsByBranch(branch_id:number):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.path}/branches/${branch_id}/products`, {headers: this.headers});
  }

  postBranchOffice(branch: BranchOffice):Observable<BranchOffice>{
    return this.http.post<BranchOffice>(`${this.path}/branches`, branch, {headers: this.headers});
  }

  putBranchOffice(id:number, branch: BranchOffice){
    return this.http.put(`${this.path}/branches/${id}`, branch, {headers: this.headers});
  }

}
