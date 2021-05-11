import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchOffice } from 'src/app/interfaces/branch-office';
import { BranchOfficeService } from 'src/app/services/branch-office/branch-office.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Output() saveUser = new EventEmitter<any>();
  public form:FormGroup = new FormGroup({});
  submitted = false;
  branches:BranchOffice[] = [];
  default = 1;
  constructor(private fb: FormBuilder, private _branch: BranchOfficeService ) { }
  

  onFormSubmit() {
    this.submitted = true;
    if(this.form.valid){
      console.log(this.form.value);
    }
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      profile_id: new FormControl(''),
      branch_office_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     });

     this._branch.getBranches().subscribe(data => {
      this.branches =  data;
    });
    this.form.get('branch_office_id')?.setValue(this.default, {onlySelf: true});
  }

}
