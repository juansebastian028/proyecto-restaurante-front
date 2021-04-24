import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css', '../shared.css']
})
export class FormRegisterComponent implements OnInit {

  constructor() { }

  onFormSubmit(f: NgForm) {
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
