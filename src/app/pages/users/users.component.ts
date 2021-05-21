import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import {TabsComponent} from 'src/app/components/tabs/tabs.component';

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
    { key: 'profile_id', display: 'hidden'},
    { key: 'profile', display: 'Perfil' },
    { key: 'branch_office_id', display: 'hidden'},
    { key: 'branch', display: 'hidden'},
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete', name: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit', name: 'edit'}] 
      },
    },
  ];

  @ViewChild('userEdit') userEditTemplate: any;
  @ViewChild(TabsComponent) tabsComponent: any;

  constructor(private _user: UserService, private _snackbar: SnackbarService) {}

  getUsers(){
    this._user.getUsers().subscribe(data => {
      this.usersRows =  data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onUserFormSubmit(form:any){      
    const {id, ...restForm } = form;
    if(form.id > 0){
      this._user.putUser(id, restForm).subscribe(data => {
        this.getUsers();
        this._snackbar.openSnackBar('Usuario actualizado exitosamente','bg-success','text-white');
        this.tabsComponent.closeActiveTab();
    });
    }else{
      this._user.postUser(restForm).subscribe(data => {
          this.getUsers();
          this._snackbar.openSnackBar('Usuario registrada exitosamente','bg-success','text-white');
          this.tabsComponent.closeActiveTab();
      });
    }

  }
  
  executeAction(obj:any){
    let user:User = obj.element;
    if(obj.action === 'edit'){
      this.tabsComponent.openTab(`Editar ${user.name}`, this.userEditTemplate, user, true);    
    }else{
      console.log('Has seleccionado eliminar');
    }
  }


  onAddUser(){
    this.tabsComponent.openTab('Nuevo Usuario', this.userEditTemplate, {}, true);
  }
}
