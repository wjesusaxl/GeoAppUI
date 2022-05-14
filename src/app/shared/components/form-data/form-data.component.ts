import { ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormData } from '../../models/form-data';
import { FormField } from '../../models/form-field';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormDataComponent implements OnInit {

  public formFieldList: FormField[] = [] as FormField[];

  @Input() formData: FormData;
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let list:any;
    if(this.formData){
      list = this.formData["controls"]["formFields"];
      this.formFieldList = list.map((field:FormField) => {
        return {
          ...field,
          safeContent : field.icon.content ? this.sanitizer.bypassSecurityTrustHtml(field.icon.content) : ""
        }
      });

      
    }
  }

}
