import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModifierGroups } from 'src/app/interfaces/modifier-groups';
import { ModifierGroupsService } from 'src/app/services/modifier-groups/modifier-groups.service';

@Component({
  selector: 'app-edit-modifier',
  templateUrl: './edit-modifier.component.html',
  styleUrls: ['./edit-modifier.component.css']
})
export class EditModifierComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  public form:FormGroup = new FormGroup({});

  submitted = false;
  modifierGroups: ModifierGroups[] = [];

  constructor(private fb: FormBuilder, private _modifier: ModifierGroupsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
     name: new FormControl('', [Validators.required]),
     price: new FormControl('', [Validators.required]),
     modifier_group: new FormControl('', [Validators.required]),
    });

    this._modifier.getModifierGroups().subscribe((data: ModifierGroups[]) => {
      this.modifierGroups = data;
    });
  }

  onFormSubmit(){
    this.submitted = true;
    if(this.form.valid){
      this.eventEmitter.emit(this.form.value);
    }
  }

}
