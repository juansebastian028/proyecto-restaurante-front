import { Component, OnInit } from '@angular/core';
import { ModifierGroups } from 'src/app/interfaces/modifier-groups';
import { ModifierGroupsService } from 'src/app/services/modifier-groups/modifier-groups.service';

@Component({
  selector: 'app-modifier-groups',
  templateUrl: './modifier-groups.component.html',
  styleUrls: ['./modifier-groups.component.css']
})
export class ModifierGroupsComponent implements OnInit {

  modifierGroupsRows: ModifierGroups[] = [];
  
  modifierGroupsColumns = [
    { key: 'id', display: 'Grupo modificador id' },
    { key: 'name', display: 'Nombre' },
    { key: 'category', display: 'Categoria' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  constructor(private _modifierGroups: ModifierGroupsService) { }

  ngOnInit(): void {
    this.getModifierGroups();
  }

  getModifierGroups(){
    this._modifierGroups.getModifierGroups().subscribe(data => {
      this.modifierGroupsRows = data;
    });
  }

  postModifierGroups(dataForm:any){
    this._modifierGroups.postModifierGroups(dataForm).subscribe(data => {
      if(data){
        alert("Grupo Modificador guardado Exitosamente");
        this.getModifierGroups();
      } else {
        console.log(data);
      }
    });
  }

  selectAction(data: any){
    console.log(data);
  }

}
