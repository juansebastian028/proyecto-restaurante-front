import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { ProductsByBranch } from 'src/app/interfaces/product-by-branch';
import { ConfigService } from 'src/app/services/config/config.service';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficeService {
  path: string = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    });
  }

  getBranches(): Observable<BranchOffice[]> {
    return this.http.get<BranchOffice[]>(`${this.path}/branches`);
  }

  postBranchOffice(branch: BranchOffice): Observable<BranchOffice> {
    return this.http.post<BranchOffice>(`${this.path}/branches`, branch, {
      headers: this.getHeaders(),
    });
  }

  putBranchOffice(id: number, branch: BranchOffice) {
    return this.http.put(`${this.path}/branches/${id}`, branch, {
      headers: this.getHeaders(),
    });
  }

  deleteBranchOffice(id: number) {
    return this.http.delete(`${this.path}/branches/${id}`, {
      headers: this.getHeaders(),
    });
  }

  getProductsByBranch(branch_id: number): Observable<ProductsByBranch[]> {
    return this.http.get<ProductsByBranch[]>(
      `${this.path}/branches/${branch_id}/products`,
      { headers: this.getHeaders() }
    );
  }

  putProductState(branch_id: number, product_id: number, state: any) {
    return this.http.put(
      `${this.path}/branches/${branch_id}/products/${product_id}`,
      state,
      { headers: this.getHeaders() }
    );
  }
}
