import { Component, OnInit } from '@angular/core';
import { HelperToggleService } from 'src/app/services/helper-toggle/helper-toggle.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  
  sideMenuClass: string = "";
  subMenuStatus: boolean = false;
  constructor(private helper: HelperToggleService){  }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(msg => this.sideMenuClass = msg);
  }

  displaySubMenu(){
    this.subMenuStatus = !this.subMenuStatus;  
  }
    
}
