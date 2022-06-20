import { Component, Input, OnInit, AfterViewInit, ViewEncapsulation, ViewChildren, QueryList, ElementRef, EventEmitter, Output, ViewChild, ContentChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'src/app/shared/enums/Language';
import { FormField } from 'src/app/shared/models/FormField';


@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit, AfterViewInit {

  @Input() formField:FormField;
  @Input() fgroup:FormGroup;
  @Input() showValMessage:boolean;
  @Input() label:any;
  @Input() placeholder:any;
  @Input() language:Language;
  // @ViewChild("inputElement", { static : false} ) inputElement!:ElementRef ;
  @ViewChildren("inputElement") inputElement!:QueryList<ElementRef> ;

  private innerValue: any = '';
  
  public validationMessage:string;
  public fieldIconClass:string;
  
  constructor() {
    
   }

  ngOnInit(): void {
    // this.name = this.formField.name;
    this.validationMessage = this.formField.fieldValidator? this.formField.fieldValidator.errorMessage : "";
    this.fieldIconClass = this.formField.icon ? this.formField.icon.class : "";
  }

  ngAfterViewInit(): void {
    
  }

  public SetFocus(){
    let i:any = Array.from(this.inputElement.first.nativeElement.children).filter((tag:any) => tag.localName === 'input');
    if(i)
      i[0].focus();
  }

  @Input()
  get value(): any{
    return this.innerValue;
  }

  set value(v: any){
    this.innerValue = v;
  }
}
