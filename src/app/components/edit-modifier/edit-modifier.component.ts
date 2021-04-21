import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-modifier',
  templateUrl: './edit-modifier.component.html',
  styleUrls: ['./edit-modifier.component.css']
})
export class EditModifierComponent implements OnInit {

  constructor() { }

  onProductFormSubmit(f: NgForm){
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
