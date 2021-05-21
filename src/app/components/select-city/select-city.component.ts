import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/interfaces/city';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css'],
})

export class SelectCityComponent implements OnInit, OnChanges {

  @Input() cities:City[] = [];
  @Output() selectEvent = new EventEmitter<number>();

  selectedCityId!:number;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void{

    if(changes.cities && !changes.cities.isFirstChange()){
        this.selectedCityId = this.cities[0].id;
        this.addNewItem(this.selectedCityId);
    }
  }

  addNewItem(city_id: number) {
    this.selectEvent.emit(city_id);
  }

}
