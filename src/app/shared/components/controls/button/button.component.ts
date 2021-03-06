import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Language } from 'src/app/shared/enums/Language';
import { FormButton } from 'src/app/shared/models/FormButton';
import { FormSrvService } from 'src/app/shared/services/form/form-srv.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() button:FormButton;
  @Input() label:any;
  @Input() title:any;
  @Input() language:Language;
  constructor(private formService:FormSrvService) { }

  SendEvent(data:any){
    this.formService.GetProcess(data);
  }

  ngOnInit(): void {
  }

}