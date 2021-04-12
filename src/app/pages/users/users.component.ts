import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dataUsers: any = [{
    "Nombre": "Pepe",
    "Apellido": "Mendez",
    "Telefono": "3112254785"
  },{
    "Nombre": "Larry",
    "Apellido": "Mesa",
    "Telefono": "3254875442"
  }];
  
  keysData = Object.keys(this.dataUsers[0]);

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    console.log(f.value);
  }

}
