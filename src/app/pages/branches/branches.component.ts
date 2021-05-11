import { Component, OnInit } from '@angular/core';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branchesRows: BranchOffice[] = [];
  
  branchesColumns = [
    { key: 'id', display: 'Sucursal id' },
    { key: 'name', display: 'Nombre' },
    { key: 'city', display: 'Ciudad' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit'}] 
      },
    },
  ];

  constructor(private _branch: BranchOfficeService) { }

  ngOnInit(): void {
    this.getBranches();
  }
  
  getBranches(){
    this._branch.getBranches().subscribe(data => {
      this.branchesRows = data;
    });
  }

  onBranchFormSubmit(form:any){
    this._branch.postBranchOffice(form).subscribe((data:any) =>{
        console.log(data);
        this.getBranches();
    });
  }

  changeBranch(value:string){
    console.log(value);
  }

}
