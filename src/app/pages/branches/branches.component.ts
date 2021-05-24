import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';
import { ProductsByBranch } from 'src/app/interfaces/product-by-branch';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branch_id: number = -1;
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
    { key: 'state', display: 'Estado'},
    {
      key: 'actions',
      display: 'Cambiar estado',
      config: { isAction: true, actions: [
        {class:['btn','btn-primary'], icon: 'change_circle', name: 'change_state'}] 
      },
    },
  ];

  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEcommerce: boolean = false;

  @ViewChild(TabsComponent) tabsComponent: any;
  @ViewChild('branchEdit') editBranchTemplate: any;

  constructor(private _branch: BranchOfficeService, private _snackbar: SnackbarService, private modalService: NgbModal, private _auth: AuthService) { }

  ngOnInit(): void {
    this.getBranches();
    this.checkProfile();
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
      }, (error) => {
        this._snackbar.openSnackBar(error.error.message, 'bg-warning','text-white');
      });
    }
  }

  getProductsByBranch(branch_id:number){
    this.branch_id = branch_id;
    this._branch.getProductsByBranch(branch_id).subscribe(data => {
      this.productsRows = data.filter(obj => obj.state === 'A' ? obj.state = 'Activo' : obj.state = 'Inactivo');
    });

  }
  
  executeAction(obj:any){
    let branch:BranchOffice = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${branch.name}`, this.editBranchTemplate, branch, true);    
    }else{
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = branch;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe((isDeleted:boolean) => {
        if(isDeleted){
          this._branch.deleteBranchOffice(branch.id).subscribe((data:any)=> {
            this.getBranches();
            this._snackbar.openSnackBar('Sucursal eliminada exitosamente','bg-success','text-white');
          })
        }
      });
    }
  }
  
  onAddBranch(){
    this.tabsComponent.openTab('Nueva Sucursal', this.editBranchTemplate, {}, true);
  }

  changeProductState(obj:any){
    const productId = obj.element.id;
    const currentBranchId = obj.element.branch_id;
    const productState = obj.element.state;
    let newState;

    if(productState === 'Activo'){
      newState = {state:'I'};
    }else{
      newState = {state:'A'};
    }

    this._branch.putProductState(currentBranchId, productId, newState)
    .subscribe(data => {
      this.getProductsByBranch(currentBranchId);
    });
  }

  checkProfile() {
    let currentUserProfile = this._auth.getCurrentUserProfile();

    if(currentUserProfile?.type === 'super_admin'){
      this.isSuperAdmin = true;
    }else if(currentUserProfile?.type === 'admin'){
      this.isAdmin = true;
      
      let currentUser = this._auth.getCurrentUser();
      this.getProductsByBranch(currentUser.branch_office_id);
    }else{
      this.isEcommerce = true;
    }
  }
}
