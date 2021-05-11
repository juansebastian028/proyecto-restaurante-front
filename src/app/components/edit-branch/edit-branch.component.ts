import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/interfaces/city';
import { CityService } from 'src/app/services/city/city.service';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {

  public form:FormGroup = new FormGroup({});
  submitted = false;
  default = 1;
  cities: City[] = [];

  constructor(private fb: FormBuilder, private _city: CityService) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
     name: new FormControl('', [Validators.required]),
     city_id: new FormControl('', [Validators.required]),
    });

    this._city.getCities().subscribe(data => {
      this.cities =  data;
    });
    
    this.form.get('city_id')?.setValue(this.default, {onlySelf: true});

  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      console.log(this.form.value);
    }
  }

}
