import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-select-city',
  templateUrl: './modal-select-city.component.html',
  styleUrls: ['./modal-select-city.component.css']
})
export class ModalSelectCityComponent implements AfterViewInit {

  @Input('modalTitle') title!: string;
  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal) {}
    
  ngAfterViewInit() {
   this.openModal();
  }

  openModal(){
    this.modalService.open(this.content, { centered: true});
  }

}
