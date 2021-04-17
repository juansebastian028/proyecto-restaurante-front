import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-make-shopping',
  templateUrl: './make-shopping.component.html',
  styleUrls: ['./make-shopping.component.css']
})
export class MakeShoppingComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onFormSubmit(f: NgForm) {
    console.log(f.value);
  }

}
