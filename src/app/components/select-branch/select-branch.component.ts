import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchOffice } from 'src/app/interfaces/branch-office';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css']
})
export class SelectBranchComponent implements OnInit {

  @Input() branchesRows:BranchOffice[] = [];
  @Output() saveBranch = new EventEmitter<number>();

  public form:FormGroup = new FormGroup({});
  default = 1;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      branch_id: new FormControl(''),
     });
     this.form.get('branch_id')?.setValue(this.default, {onlySelf: true});
     this.form.controls.branch_id.setValue(this.default); 
     this.onBranchChange();
  }

  onBranchChange(){
    let branch_id:number = this.form.value.branch_id;	
    this.saveBranch.emit(branch_id);
  }

}
