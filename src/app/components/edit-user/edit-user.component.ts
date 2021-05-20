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
  @Input() user:any;

  public form:FormGroup = new FormGroup({});

  submitted = false;
  branches:BranchOffice[] = [];

  constructor(private fb: FormBuilder, private _branch: BranchOfficeService ) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      profile_id: new FormControl(''),
      branch_office_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: '',
     });
  }
  

  onFormSubmit() {
    this.submitted = true;
    if(this.form.valid){
      this.saveUser.emit(this.form.value);
    }
  }
  
  ngOnInit(): void {
    this._branch.getBranches().subscribe(data => {
      this.branches =  data;

      this.form.setValue({
        id: this.user.id || -1,
        name: this.user.name || '',
        lastname: this.user.lastname || '',
        profile_id: this.user.profile_id || 1,
        branch_office_id: this.user.branch_office_id || this.branches[0].id,
        username: this.user.username || '',
        email: this.user.email || '',
        password: ''
      });
    });    
    this.validateRequiredPassword(); 
  }

  validateRequiredPassword(){
    if(this.user.id) {
      this.form.get('password')?.clearValidators();
    } else {
      this.form.get('password')?.setValidators(Validators.required);
    }
  }
}
