import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersRows: any = [
    {
    "Nombre": "Pepe",
    "Apellido": "Mendez",
    "Telefono": "3112254785"
    },
    {
    "Nombre": "Larry",
    "Apellido": "Mesa",
    "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    }, 
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    },
    {
      "Nombre": "Larry",
      "Apellido": "Mesa",
      "Telefono": "3254875442"
    }
];
  
  usersColumns = Object.keys(this.usersRows[0]);

  constructor() { }

  ngOnInit(): void {
  }

}
