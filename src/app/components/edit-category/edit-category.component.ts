import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor() { }

  onProductFormSubmit(f: NgForm){
    console.log(f.value);
  }

  ngOnInit(): void {
  }

}
