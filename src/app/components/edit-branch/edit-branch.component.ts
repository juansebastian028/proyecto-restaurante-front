import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  constructor() { }

  onProductFormSubmit(f: NgForm){
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
