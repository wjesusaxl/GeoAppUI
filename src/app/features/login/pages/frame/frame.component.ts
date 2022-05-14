import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormData } from 'src/app/shared/models/form-data';
import LoginFormData from '../../forms/username.json';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss', '../../scss/frame.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameComponent implements OnInit {
 
  public formData: FormData = LoginFormData;

  ngOnInit(): void {
    
  }

}
