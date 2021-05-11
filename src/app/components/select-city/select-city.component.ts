import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { City } from 'src/app/interfaces/city';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css'],
})

export class SelectCityComponent implements OnInit, OnChanges {

  @Input() cities:City[] = [];
  @Output() newItemEvent = new EventEmitter<number>();

  selectedCityId:number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void{

    if(changes && changes.cities.currentValue){
        this.selectedCityId = 1;
        this.addNewItem(this.selectedCityId);
    }
  }

  addNewItem(value: number) {
    this.newItemEvent.emit(value);
  }

}
