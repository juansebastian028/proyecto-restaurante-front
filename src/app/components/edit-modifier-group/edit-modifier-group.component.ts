import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-modifier-group',
  templateUrl: './edit-modifier-group.component.html',
  styleUrls: ['./edit-modifier-group.component.css']
})
export class EditModifierGroupComponent implements OnInit {

  constructor() { }

  onModifierGroupFormSubmit(f: NgForm) {
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
