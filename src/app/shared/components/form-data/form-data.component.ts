import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormData } from '../../models/form-data';
import { FormField } from '../../models/form-field';
import { Button } from '../../models/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})

export class FormDataComponent implements OnInit {

  public formFieldList: FormField[] = [] as FormField[];
  public buttonList: Button[] = [] as Button[];  

  @Input() formData: FormData;
  @Output() formEvent = new EventEmitter<User>();
  // @Input() parentCallbackFunction:(args:any)=> void;
  @Input() extEvent: (param:any) => void;
  fgroup : FormGroup;
  showValMessage:boolean;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.SetLists();
    // this.formGroupX = new FormGroup(this.GetFormControlList());
    this.fgroup = new FormGroup(this.GetFormControlList());
  }

  SetLists():void{
    let list:any, buttons:any;    
    if(this.formData){
      list = this.formData["controls"]["formFields"];
      this.formFieldList = list.map((field:FormField) => {
        return {
          ...field,
          safeContent : field.icon.content ? this.sanitizer.bypassSecurityTrustHtml(field.icon.content) : ""
        }
      });

      if("buttons" in this.formData){
        buttons = this.formData["buttons"];
        this.buttonList = buttons.map((button:Button) => {
          return {
            ...button,
            safeContent : button.icon!.content ? this.sanitizer.bypassSecurityTrustHtml(button.icon!.content) : ""
          }
        });
      }
      
    }
  }

  GetFormControlList(){
    let list:any;
    let group: any = {};
    list = this.formData["controls"]["formFields"];
    list.forEach( i => {
      group[i.name] = new FormControl('', i.fieldValidator.required ? Validators.required : null)
    });
    group = {
      "username": new FormControl('', Validators.required)
    };
    return group;
  }

  onSubmit(form:any){
    
  }

  GetFormContent(){
    console.log("Get Form Content");
    let data:any = {};
    this.showValMessage = !this.fgroup.valid;
    if(this.fgroup.valid){
      data = this.fgroup.value;
    }
    this.extEvent(data);
    
  }

}
