import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { City } from 'src/app/interfaces/city';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css'],
})

export class SelectCityComponent implements OnInit, OnChanges {

  @Input() cities:City[] = [];

  selectedCityId:number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.cities);
  }

  ngOnChanges(changes: SimpleChanges): void{

    if(changes && changes.cities.currentValue){
        this.selectedCityId = 1;
    }
  }

}
