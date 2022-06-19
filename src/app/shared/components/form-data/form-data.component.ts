import { Component, forwardRef, Input, OnInit, Output, ViewEncapsulation, EventEmitter, ViewChildren, ElementRef, QueryList, OnDestroy} from '@angular/core';
import { FormData } from '../../models/FormData';
import { FormField } from '../../models/FormField';
import { FormButton } from '../../models/FormButton';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { FormSrvService } from '../../services/form/form-srv.service';
import { Subscription } from 'rxjs';
import { Process } from '../../models/Process';
import { ProcessResult } from '../../models/ProcessResult';
import { ExceptionSrvService } from '../../services/exception/exception-srv.service';
import { Language } from '../../enums/Language';

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
  @Input() status:string;
  @Input() validationMessage:string;
  fgroup : FormGroup;
  formSubscription:Subscription;
  @Input() labels:any;
  @Input() language:Language;
  
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


  RunProcess(process:Process){    
    let internalArgs: string[] = ['validateContent'];
    this.DisplayProcessMessage("");
  
    let args = {};
    if("args" in process){        
      let procArgs = process["args"];
      for(let k in procArgs){
        if(!internalArgs.includes(k))
        args[k] = procArgs[k];
      }
    }
    let processName = process["name"];
    let validateContent:true = "args" in process ? ( "validateContent" in process["args"] ? process["args"]["validateContent"] : false ) : false;

    let success:boolean = validateContent ? this.fgroup.valid : true ;
    let processCode = processName == "get-form-content" ? ( success ? "100" : "101" ) : "100";
    let result = {
      process: {
        name: processName,
        args: args
      },
      success: success,
      code: processCode,
      data: success ? this.fgroup.value : {},
      message: "ok"
    };
    
    if(success){
      this.formEvent.emit(result);
    }
    else{
      this.DisplayProcessMessage(
        this.excService.getMessage(
          processName,
          processCode,
          this.language)["description"]
      );
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
