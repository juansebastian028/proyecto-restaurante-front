import { Component, OnInit, ViewChild } from '@angular/core';
import { Modifier } from 'src/app/interfaces/modifier';
import { ModifierService } from 'src/app/services/modifier/modifier.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.css']
})
export class ModifiersComponent implements OnInit {
  
  modifiersRows: Modifier[] = [];
  
  modifiersColumns = [
    { key: 'id', display: 'Modificador id'},
    { key: 'name', display: 'Nombre'},
    { key: 'price', display: 'Precio'},
    { key: 'modifier_group', display: 'hidden'},
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  @ViewChild('modifierEdit') modifierEditTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(private _modifier: ModifierService, private _snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.getModifiers();
  }

  getModifiers(){
    this._modifier.getModifiers().subscribe(data => {
      this.modifiersRows = data;
    });
  }

  onModifierFormSubmit(form:any){      
    const {id, ...restForm } = form;
    if(form.id > 0){
      this._modifier.putModifier(id, restForm).subscribe(data => {
        this.getModifiers();
        this._snackbar.openSnackBar('Modificador actualizado exitosamente','bg-success','text-white');
        this.tabsComponent.closeActiveTab();
    });
    }else{
      this._modifier.postModifier(restForm).subscribe(data => {
          this.getModifiers();
          this._snackbar.openSnackBar('Modificador registrada exitosamente','bg-success','text-white');
          this.tabsComponent.closeActiveTab();
      });
    }

  }
  
  executeAction(obj:any){
    let modifier:Modifier = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${modifier.name}`, this.modifierEditTemplate, modifier, true);    
    }else{
      console.log('Has seleccionado eliminar');
    }
  }

  onAddModifier(){
    this.tabsComponent.openTab('Nuevo Modificador', this.modifierEditTemplate, {}, true);
  }
}
