import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormField } from 'src/app/shared/models/form-field';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit {

  @Input() formField:FormField;
  constructor() { }

  ngOnInit(): void {
  }

}
