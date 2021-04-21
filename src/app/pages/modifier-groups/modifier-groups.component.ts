import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-groups',
  templateUrl: './modifier-groups.component.html',
  styleUrls: ['./modifier-groups.component.css']
})
export class ModifierGroupsComponent implements OnInit {

  modifierGroupsRows: any = [];
  
  modifierGroupsColumns: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
