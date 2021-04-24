import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  constructor() { }

  onFormSubmit(f: NgForm){
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
