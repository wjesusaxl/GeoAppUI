import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Language } from 'src/app/shared/enums/Language';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public language:Language;
  constructor(private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.language = "language" in params ? params["language"] : Language.english;
    });
   }

  ngOnInit(): void {
  }

}
