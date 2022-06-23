import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Language } from 'src/app/shared/enums/Language';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {

  @Input() language:Language;
  @Input() project:Project;
  @Input() labels:any;
  constructor() { }

  ngOnInit(): void {
  }

}
