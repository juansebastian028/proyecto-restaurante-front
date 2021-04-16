import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css'],
})

export class SelectCityComponent implements OnInit {

  cities = [
      { id: 1, name: 'Pereira' },
      { id: 2, name: 'Manizales' },
      { id: 3, name: 'Bogotá' },
      { id: 4, name: 'Medellín' },
  ];

  selectedCityId = this.cities[0].id;

  constructor() { }

  ngOnInit(): void {
  }

}
