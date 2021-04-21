import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  branchesRows: [] = [];
  
  branchesColumns:Array<string> = [];

  productsRows = [
    {"name": "Helado"},
    {"name": "Jugo"}
  ];
  
  productsColumns:Array<string> = ["name"];

  constructor() { }

  ngOnInit(): void {
  }

}
