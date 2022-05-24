import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @ViewChild("formFieldRef") formFieldRef:ElementRef  ;

  public validationMessage:string;
  public fieldIconClass:string;
  // public name:string;
  
  constructor() { }

  ngOnInit(): void {
    // this.name = this.formField.name;
    this.validationMessage = this.formField.fieldValidator? this.formField.fieldValidator.errorMessage : "";
    this.fieldIconClass = this.formField.icon ? this.formField.icon.class : "";
  }
}
