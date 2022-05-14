import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDataComponent } from './components/form-data/form-data.component';
import { FormFieldComponent } from './components/controls/form-field/form-field.component';
import { ButtonComponent } from './components/controls/button/button.component';

@NgModule({
  declarations: [
    FormDataComponent,
    FormFieldComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDataComponent, FormFieldComponent
  ]
})
export class SharedModule { }
