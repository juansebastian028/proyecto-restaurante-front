import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersRows: any = [
    { 
      id: 1,
      name: 'Pepe',
      lastname: 'Mendez',
      phone_number: '3112254785',
    },
  ];

  usersColumns = [
    { key: 'id', display: 'Usuario id' },
    { key: 'name', display: 'Nombre' },
    { key: 'lastname', display: 'Apellido' },
    { key: 'phone_number', display: 'Telefono' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit'}] 
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.usersColumns);
  }
}
