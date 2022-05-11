import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
