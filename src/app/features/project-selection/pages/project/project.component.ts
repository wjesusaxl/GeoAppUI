import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Project } from 'src/app/shared/models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements OnInit {

  @Input() project:Project;
  constructor() { }

  ngOnInit(): void {
  }

}
