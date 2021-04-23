import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  citiesRows: City[] = []; 
  citiesColumns = [
    { key: 'id', display: 'Ciudad id' },
    { key: 'name', display: 'Nombre' },
    {
      key: 'actions',
      display: 'Acciones',
      config: { isAction: true, actions: [
        {class:['btn','btn-danger'], icon: 'delete'}, 
        {class:['btn' ,'btn-warning'], icon:'edit'}] 
      },
    },
  ];

  constructor(private _city: CityService) { }

  ngOnInit(): void {
    this._city.getCities().subscribe(data => {
      this.citiesRows =  data;
    });
  }
}
