import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city/city.service';

@Component({
  selector: 'app-modal-select-city',
  templateUrl: './modal-select-city.component.html',
  styleUrls: ['./modal-select-city.component.css']
})
export class ModalSelectCityComponent implements OnInit {

  modalRef !: NgbModalRef;
  @Input('modalTitle') title!: string;
  @ViewChild('content') content: any;
  @Output() saveCity = new EventEmitter<number>();
  modalOption: NgbModalOptions = {}; 
  cities: City[] = [];
  selectedCity:number = 0;

  constructor(private modalService: NgbModal, private _city: CityService) {}
    
  ngOnInit() {
    this._city.getCities().subscribe(data => {
      this.cities =  data;
    });
  }

  ngAfterViewInit() {
   this.openModal();
  }

  openModal(){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.centered = true;
    this.modalRef = this.modalService.open(this.content, this.modalOption);
  }

  getProductsByCity(city_id: number) {
    this.selectedCity = city_id;
  }

  loadProducts(){
    this.modalRef.close();
    this.saveCity.emit(this.selectedCity);
  }

}
