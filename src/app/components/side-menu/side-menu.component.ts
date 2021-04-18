import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  
  sideMenuClass: string = "";
  subMenuStatus: boolean = false;
  constructor(private helper: HelperService){  }

  ngOnInit(): void {
    this.helper.customMessage.subscribe(msg => this.sideMenuClass = msg);
  }

  displaySubMenu(){
    this.subMenuStatus = !this.subMenuStatus;  
  }
    
}
