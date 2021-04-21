import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  citiesRows: City[] = [];
  
  citiesColumns:Array<string> = [];

  constructor(private _city: CityService) { }

  ngOnInit(): void {
    this._city.getCities().subscribe(data => {
      this.citiesRows = data;
      this.citiesColumns = Object.keys(this.citiesRows[0]);
    });
  }

}
