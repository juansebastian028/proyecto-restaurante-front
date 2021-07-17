import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  currentUser: any;

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._auth.getCurrentUser();
  }

  getUser() {
    let id = this.currentUser.id;
    this._user.getUser(id).subscribe(
      (data) => {
        localStorage.setItem('current_user', JSON.stringify(data));
        if (data.city_id) {
          localStorage.setItem('selected_city', JSON.stringify(data.city_id));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUserFormSubmit(form: any) {
    const { id, ...restForm } = form;
    if (form.id > 0) {
      this._user.putUser(id, restForm).subscribe(
        (data) => {
          this.getUser();
          this._snackbar.openSnackBar(
            'Usuario actualizado exitosamente',
            'bg-success',
            'text-white'
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
