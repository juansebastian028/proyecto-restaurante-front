import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {

  @Input('modalTitle') title!: string;
  @ViewChild('content') content: any;
  closeResult = '';

  constructor(private modalService: NgbModal) {}

  ngAfterViewInit() {
    this.openModal();
  }

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

}
