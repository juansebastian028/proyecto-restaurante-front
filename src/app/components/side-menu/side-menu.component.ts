import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperToggleService } from 'src/app/services/helper-toggle/helper-toggle.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  sideMenuClass: string = '';
  subMenuStatus: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEcommerce: boolean = false;

  constructor(
    private helper: HelperToggleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.helper.customMessage.subscribe((msg) => (this.sideMenuClass = msg));
    this.checkProfile();
  }

  displaySubMenu() {
    this.subMenuStatus = !this.subMenuStatus;
  }

  checkProfile() {
    let currentUserProfile = this.authService.getCurrentUserProfile();

    if (currentUserProfile?.type === 'super_admin') {
      this.isSuperAdmin = true;
    } else if (currentUserProfile?.type === 'admin') {
      this.isAdmin = true;
    } else {
      this.isEcommerce = true;
    }
  }
}
