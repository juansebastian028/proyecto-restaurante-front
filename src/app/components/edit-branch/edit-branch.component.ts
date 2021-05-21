import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() saveBranch = new EventEmitter<any>();
  @Input() branch:any;
  submitted = false;
  default = 1;
  cities: City[] = [];

  constructor(private fb: FormBuilder, private _city: CityService) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
     });
  }

  ngOnInit(): void {
    this._city.getCities().subscribe(data => {
      this.cities =  data;
      this.form.setValue({
        id: this.branch.id || -1,
        name: this.branch.name || '',
        city_id: this.branch.city_id || this.cities[0].id
      });
    });
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.saveBranch.emit(this.form.value);
    }
  }
}
