import { Component, OnInit, ViewChild } from '@angular/core';
import { ModifierGroup } from 'src/app/interfaces/modifier-group';
import { ModifierGroupService } from 'src/app/services/modifier-group/modifier-group.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modifier-groups',
  templateUrl: './modifier-groups.component.html',
  styleUrls: ['./modifier-groups.component.css']
})
export class ModifierGroupsComponent implements OnInit {

  modifierGroupsRows: ModifierGroup[] = [];
  
  modifierGroupsColumns = [
    { key: 'id', display: 'Grupo modificador id' },
    { key: 'name', display: 'Nombre' },
    { key: 'selection_type', display: 'hidden' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  @ViewChild('modifierGroupEdit') modifierGroupEditTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(private _modifierGroup: ModifierGroupService,  private _snackbar: SnackbarService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getModifierGroups();
  }

  getModifierGroups(){
    this._modifierGroup.getModifierGroups().subscribe(data => {
      this.modifierGroupsRows = data;
    });
  }

  onModifierGroupFormSubmit(form:any){      
    const {id, ...restForm } = form;
    if(form.id > 0){
      this._modifierGroup.putModifierGroup(id, restForm).subscribe(data => {
          this.getModifierGroups();
          this._snackbar.openSnackBar('Grupo Modificador actualizado exitosamente','bg-success','text-white');
          this.tabsComponent.closeActiveTab();
      });
    }else{
      this._modifierGroup.postModifierGroup(restForm).subscribe(data => {
          this.getModifierGroups();
          this._snackbar.openSnackBar('Grupo Modificador registrada exitosamente','bg-success','text-white');
          this.tabsComponent.closeActiveTab();
      });
    }

  }
  
  executeAction(obj:any){
    let modifierGroup:ModifierGroup = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${modifierGroup.name}`, this.modifierGroupEditTemplate, modifierGroup, true);    
    }else{
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.data = modifierGroup;
      modalRef.componentInstance.modalRef = modalRef;

      modalRef.componentInstance.eventEmitter.subscribe((isDeleted:boolean) => {
        if(isDeleted){
          this._modifierGroup.deleteModifierGroup(modifierGroup.id).subscribe((data:any)=> {
            this.getModifierGroups();
            this._snackbar.openSnackBar('Grupo Modificador eliminado exitosamente','bg-success','text-white');
          });
        }
      });
    }
  }

  onAddGroupModifier(){
    this.tabsComponent.openTab('Nuevo Grupo Modificador', this.modifierGroupEditTemplate, {}, true);
  }

}
