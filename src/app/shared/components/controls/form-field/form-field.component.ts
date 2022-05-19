import { Component, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/models/form-field';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit {

  @Input() formField:FormField;
  @Input() fgroup:FormGroup;
  @Input() showValMessage:boolean;
  public validationMessage:string;
  
  constructor() { }

  ngOnInit(): void {
    this.validationMessage = this.formField.fieldValidator.errorMessage;
  }
}
