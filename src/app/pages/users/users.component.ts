import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersRows: User[] = [];

  usersColumns = [
    { key: 'id', display: 'Usuario id' },
    { key: 'name', display: 'Nombre' },
    { key: 'lastname', display: 'Apellido' },
    { key: 'profile', display: 'Perfil' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  constructor(private _user: UserService) {}

  getUsers(){
    this._user.getUsers().subscribe(data => {
      this.usersRows =  data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  executeAction(data: any){
    console.log(data);
  }

  onUserFormSubmit(form:any){
    console.log(form);
  }
}
