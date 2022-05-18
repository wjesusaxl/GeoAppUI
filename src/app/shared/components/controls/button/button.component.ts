import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Button } from 'src/app/shared/models/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

  @Input() button:Button;
  @Input() callbackFunction: (args: any) => void;
  constructor() { }

  ngOnInit(): void {
  }

}
