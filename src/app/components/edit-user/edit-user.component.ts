import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor() { }
  

  onFormSubmit(f: NgForm) {
    console.log(f.value);
  }
  
  ngOnInit(): void {
  }

}
