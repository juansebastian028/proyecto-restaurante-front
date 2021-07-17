import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModifierGroup } from 'src/app/interfaces/modifier-group';
import { ModifierGroupService } from 'src/app/services/modifier-group/modifier-group.service';

@Component({
  selector: 'app-edit-modifier',
  templateUrl: './edit-modifier.component.html',
  styleUrls: ['./edit-modifier.component.css'],
})
export class EditModifierComponent implements OnInit {
  @Output() saveModifier = new EventEmitter();
  @Input() modifier!: any;

  public form: FormGroup = new FormGroup({});
  submitted = false;
  modifierGroups: ModifierGroup[] = [];

  constructor(
    private fb: FormBuilder,
    private _modifierGroup: ModifierGroupService
  ) {
    this.form = this.fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      modifier_groups_ids: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      id: this.modifier.id || -1,
      name: this.modifier.name || '',
      price: this.modifier.price || 0,
      modifier_groups_ids: this.modifier.modifier_group
        ? this.modifier.modifier_group.map((obj: { id: number }) => obj.id)
        : '',
    });

    this._modifierGroup.getModifierGroups().subscribe(
      (data: ModifierGroup[]) => {
        this.modifierGroups = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.saveModifier.emit(this.form.value);
    }
  }
}
