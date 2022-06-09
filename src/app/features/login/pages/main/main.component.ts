import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  companyCode:string;

  constructor(private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.companyCode = params["companyCode"];
    });
   }

  ngOnInit() {
    
  }

}