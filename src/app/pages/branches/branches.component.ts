import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';
import { ProductsByBranch } from 'src/app/interfaces/product-by-branch';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';


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
    { key: 'city_id', display: 'hidden'},
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  productsRows: ProductsByBranch[] = [];
  productsColumns = [
    { key: 'id', display: 'Producto id' },
    { key: 'name', display: 'Nombre' },
    { key: 'price', display: 'Precio' },
    { key: 'category', display: 'Categoria' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-success'], icon: 'check', name: 'activate'}] 
      },
    },
  ];

  @ViewChild(TabsComponent) tabsComponent: any;
  @ViewChild('branchEdit') editBranchTemplate: any;

  constructor(private _branch: BranchOfficeService, private _snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getBranches();
  }
  
  getBranches(){
    this._branch.getBranches().subscribe(data => {
      this.branchesRows = data;
    });
  }

  onBranchFormSubmit(form:any){      
    const {id, ...restForm } = form;
    if(form.id > 0){
      this._branch.putBranchOffice(id, restForm).subscribe( (data:any) => {
        this.getBranches();
        this._snackbar.openSnackBar('Sucursal actualizada exitosamente','bg-success','text-white');
        this.tabsComponent.closeActiveTab();
      });
    }else{
      this._branch.postBranchOffice(restForm).subscribe((data:any) =>{
        this.getBranches();
        this._snackbar.openSnackBar('Sucursal registrada exitosamente','bg-success','text-white');
        this.tabsComponent.closeActiveTab();
      });
    }
  }

  getProductsByBranch(branch_id:number){
    this._branch.getProductsByBranch(branch_id).subscribe(data => {
      this.productsRows = data;
    });

  }
  
  executeAction(obj:any){
    let branch:BranchOffice = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${branch.name}`, this.editBranchTemplate, branch, true);    
    }else{
      console.log('Has seleccionado eliminar');
    }
  }
  
  onEditCity(branch:any){

  }

  onAddBranch(){
    this.tabsComponent.openTab('Nueva Sucursal', this.editBranchTemplate, {}, true);
  }
}
