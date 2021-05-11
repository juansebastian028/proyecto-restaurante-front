import { Component, OnInit } from '@angular/core';
import { Modifier } from 'src/app/interfaces/modifier';
import { ModifierService } from 'src/app/services/modifier/modifier.service';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.css']
})
export class ModifiersComponent implements OnInit {
  
  modifiersRows: Modifier[] = [];
  
  modifiersColumns = [
    { key: 'id', display: 'Modificador id' },
    { key: 'name', display: 'Nombre' },
    { key: 'price', display: 'Precio' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit'}] 
      },
    },
  ];

  constructor(private _modifier: ModifierService) { }

  ngOnInit(): void {
    
  }

  getModifiers(){
    this._modifier.getModifiers().subscribe(data => {
      this.modifiersRows = data;
    });
  }

  postModifier(dataForm:any){
    this._modifier.postModifier(dataForm).subscribe(data => {
      if(data){
        alert("Modificador guardado Exitosamente");
        this.getModifiers();
      } else {
        console.log(data);
      }
    });
  }
}
