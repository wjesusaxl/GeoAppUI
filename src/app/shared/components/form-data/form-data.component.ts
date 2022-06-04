import { Component, forwardRef, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChildren, ElementRef, QueryList} from '@angular/core';
import { FormData } from '../../models/FormData';
import { FormField } from '../../models/FormField';
import { FormButton } from '../../models/FormButton';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { EventToTrigger } from '../../models/Event';
import { FormSrvService } from '../../services/form/form-srv.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{
    provide: ControlContainer, 
    useExisting: FormGroupDirective}
  ]
})

export class FormDataComponent implements OnInit {

  public formFieldList: FormField[] = [] as FormField[];
  public buttonList: FormButton[] = [] as FormButton[];  
  
  @Input() formData: FormData;
  @Input() public active:boolean;
  @Output() formEvent = new EventEmitter<any>();
  // @Input() parentCallbackFunction:(args:any)=> void;
  // @Input() extEvent: (param:any) => void;
  @Input() status:string;
  fgroup : FormGroup;
  // showValMessage:boolean;
  
  
  constructor(private sanitizer: DomSanitizer, private formService:FormSrvService) { }

  ngOnInit(): void {
    this.SetLists();
    this.fgroup = new FormGroup(this.GetFormControlList());

    this.formService.ReturnEvent().subscribe({
      next:(data:any) => {
        this.ProcessEvent(data);
      }
    })
  }

  SetLists():void{
    let list:any, buttons:any;    
    if(this.formData){
      list = this.formData["controls"]["formFields"];
      this.formFieldList = list.map((field:FormField) => {
        return {
          ...field,
          safeContent : field.icon ? (field.icon.content ? this.sanitizer.bypassSecurityTrustHtml(field.icon.content) : "") : ""
        }
      });

      if("buttons" in this.formData){
        buttons = this.formData["buttons"];
        this.buttonList = buttons.map((button:FormButton) => {
          return {
            ...button,
            safeContent : button.icon!.content ? this.sanitizer.bypassSecurityTrustHtml(button.icon!.content) : ""
          }
        });
      }
      
    }
  }

  GetFormControlList(){
    let group: any = {};
    let list = this.formData["controls"]["formFields"];
    list.forEach( i => {
      group[i.name] = new FormControl('', i.fieldValidator ? (i.fieldValidator.required ? Validators.required : null) : null)
    });
    return group;
  }

  onSubmit(form:any){
    
  }


  GetFormContent(){
    let data:any;
    // this.showValMessage = !this.fgroup.valid;
    if(this.fgroup.valid){
      data = this.fgroup.value;
      // if(data)
      //   this.extEvent(data);
    }
  }

 ProcessEvent(data:any){
   console.log("Form Data", this.fgroup.value);
   this.formEvent.emit(data);
   
 }

  public SetValues(data:any){
    Object.keys(this.fgroup.controls).forEach(key => {      
      this.fgroup.controls[key].setValue(data[key]);
    });
  }

  public Hide(){

  }
}
