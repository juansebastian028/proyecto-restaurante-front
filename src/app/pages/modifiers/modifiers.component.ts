import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifiers',
  templateUrl: './modifiers.component.html',
  styleUrls: ['./modifiers.component.css']
})
export class ModifiersComponent implements OnInit {
  
  citiesRows: [] = [];
  
  citiesColumns:Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
