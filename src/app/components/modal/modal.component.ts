import { Component, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnChanges  {

  @Input('modalTitle') title!: string;
  @ViewChild('content') content: any;

  @Input() prop!: boolean;
  
  closeResult = '';
  
  constructor(private modalService: NgbModal) {}
  
  ngOnChanges() {
    if(this.prop || !this.prop){
      this.openModal();
    }
  }

  ngAfterViewInit() {
    if(!this.prop){
      this.openModal();
    }
  }

  openModal(){
    this.modalService.open(this.content, { centered: true });
  }

}
