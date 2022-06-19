import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company/company.service';
import { Language } from 'src/app/shared/enums/Language';
import { Project } from 'src/app/shared/models/Project';
import Labels from 'src/assets/common/labels/project-selection.json';

@Component({
  selector: 'app-project-selection-main',
  templateUrl: './project-selection-main.component.html',
  styleUrls: ['./project-selection-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProjectSelectionMainComponent implements OnInit {

  @Input() language:Language;
  public labels:any = Labels;
  public projects:Project[] = [];

  constructor(private companySrv:CompanyService) { }

  ngOnInit(): void {    
    this.GetProjects("wjesusaxl");        
  }

  GetProjects(username:string){    
    this.companySrv.GetProjects(username).subscribe((response:any)=>{
      if(response["success"]){        
        this.projects = response["data"];        
      }else{
        
      }
      
    });    
  }
}
