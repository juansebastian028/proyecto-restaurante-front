import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city/city.service';

@Component({
  selector: 'app-modal-select-city',
  templateUrl: './modal-select-city.component.html',
  styleUrls: ['./modal-select-city.component.css']
})
export class ModalSelectCityComponent implements OnInit {

  cities: City[] = []; 
  @Input('modalTitle') title!: string;
  @ViewChild('content') content: any;

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
    this.modalService.open(this.content, { centered: true});
  }

  getProductsByCity(city_id: number) {
  }

}
