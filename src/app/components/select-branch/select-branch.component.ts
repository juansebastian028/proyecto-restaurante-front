import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BranchOffice } from 'src/app/interfaces/branch-office';

@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.css']
})
export class SelectBranchComponent implements OnInit, OnChanges {

  @Input() branchesRows:BranchOffice[] = [];
  @Output() saveBranch = new EventEmitter<number>();

  public form:FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      branch_id: new FormControl(''),
     });
  }

  ngOnInit(): void {
    
  }

  onBranchChange(){
    let branch_id:number = this.form.value.branch_id;	
    this.saveBranch.emit(branch_id);
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes.branchesRows && !changes.branchesRows.isFirstChange()){
      this.form.controls.branch_id.setValue(this.branchesRows[0]?.id); 
      this.onBranchChange();
    }
  }

}
