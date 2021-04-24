import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor() { }
  onFormSubmit(f: NgForm){
    console.log(f.value);
  }
  ngOnInit(): void {
  }

}
