import { Component, forwardRef, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChildren, ElementRef, QueryList, OnDestroy} from '@angular/core';
import { FormData } from '../../models/FormData';
import { FormField } from '../../models/FormField';
import { FormButton } from '../../models/FormButton';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { Process } from '../../models/Process';
import { FormSrvService } from '../../services/form/form-srv.service';
import { Subscription } from 'rxjs';
import { ProcessResult } from '../../models/ProcessResult';
import { ExceptionSrvService } from '../../services/exception/exception-srv.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{
    provide: ControlContainer, 
    useExisting: FormGroupDirective}
  ],
  providers: [FormSrvService]
})

export class FormDataComponent implements OnInit, OnDestroy {

  public formFieldList: FormField[] = [] as FormField[];
  public buttonList: FormButton[] = [] as FormButton[];  
  
  @Input() formData: FormData;
  @Input() public active:boolean;
  @Output() formEvent = new EventEmitter<ProcessResult>();
  // @Input() parentCallbackFunction:(args:any)=> void;
  // @Input() extEvent: (param:any) => void;
  @Input() status:string;
  fgroup : FormGroup;
  formSubscription:Subscription;
  public validationMessage;
  // showValMessage:boolean;
  
  
  constructor(
    private sanitizer: DomSanitizer, 
    private formService:FormSrvService,
    private excService:ExceptionSrvService) { }

  ngOnInit(): void {
    this.SetLists();
    this.fgroup = new FormGroup(this.GetFormControlList());

    this.formSubscription = this.formService.ReturnProcess().subscribe({
      next:(data:any) => {        
        this.RunProcess(data);
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

  RunProcess(process:Process){    
    let internalArgs: string[] = ['validateContent'];
    let success:boolean = true;
    this.DisplayProcessMessage("");
  
    let additionalInfo = {};
    if("args" in process){        
      let additionalInfo = process["args"];
      for(let k in additionalInfo){
        if(!internalArgs.includes(k))
        additionalInfo[k] = additionalInfo[k];
      }
    }

    let validateContent:true = "args" in process ? ( "validateContent" in process["args"] ? process["args"]["validateContent"] : false ) : false;

    if(process["name"] == "get-form-content"){

      success = validateContent ? this.fgroup.valid : true ;
      let result = {
        process: {
          name: "form-validation",
        },
        success: success,
        code: success ? "100" : "101",
        data: success ? this.fgroup.value : {},
        message: "ok"
      };
      if(success){
        this.formEvent.emit(result);
      }
      else{
        this.DisplayProcessMessage(
          this.excService.getMessage(
            result["process"]["name"], 
            result["code"], 
            "eng")["description"]
        );
      }
        
    }

    
    
  }

  public DisplayProcessMessage(message:string){
    this.validationMessage = message; 
  }

  public SetValues(data:any){
    Object.keys(this.fgroup.controls).forEach(key => {      
      this.fgroup.controls[key].setValue(data[key]);
    });
  }

  public Hide(){

  }

  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }
}
