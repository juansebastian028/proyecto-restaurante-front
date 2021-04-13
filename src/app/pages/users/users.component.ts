import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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


  onSubmit(f: NgForm) {
    console.log(f.value);
  }

}
