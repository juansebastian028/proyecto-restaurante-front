import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productsRows: Product[] = [];
  
  productsColumns = [
    { key: 'id', display: 'Producto id'},
    { key: 'name', display: 'Nombre'},
    { key: 'price', display: 'Precio'},
    { key: 'category', display: 'Categoria'},
    { key: 'branches', display: 'hidden'},
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  @ViewChild('productEdit') productEditTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(private _product: ProductService, private _snackbar: SnackbarService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._product.getProducts().subscribe(data => {
      this.productsRows = data;
    });
  }

  onProductFormSubmit(obj:any){  
    if(obj.id > 0){
      obj.formDataProduct.append('_method', 'PUT');
      this._product.putProduct(obj.id, obj.formDataProduct).subscribe(data => {
        this.getProducts();
        this._snackbar.openSnackBar('Producto actualizado exitosamente','bg-success','text-white');
        this.tabsComponent.closeActiveTab();
      });
    }else{
      this._product.postProduct(obj.formDataProduct).subscribe(data => {
          this.getProducts();
          this._snackbar.openSnackBar('Producto registrada exitosamente','bg-success','text-white');
          this.tabsComponent.closeActiveTab();
      });
    }

  }

  executeAction(obj:any){
    let product:Product = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${product.name}`, this.productEditTemplate, product, true);    
    }else{
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = product;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe((isDeleted:boolean) => {
        if(isDeleted){
          this._product.deleteProduct(product.id).subscribe((data:any) => {
            this.getProducts();
            this._snackbar.openSnackBar('Producto eliminado exitosamente','bg-success','text-white');
            this.tabsComponent.closeActiveTab();
          });
        }
      });
    }
  }
  

  onAddProduct(){
    this.tabsComponent.openTab('Nuevo Producto', this.productEditTemplate, {}, true);
  }

}
