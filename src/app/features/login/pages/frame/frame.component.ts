import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormData } from 'src/app/shared/models/form-data';
import { User } from 'src/app/shared/models/user';
import LoginFormData from '../../forms/username.json';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss', '../../scss/frame.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameComponent implements OnInit {
 
  public formData: FormData = LoginFormData;
  public user:User;
  // public formContent:any;
  // public extValidateUser = this.validateUser.bind(this);
  public extValidateUser = this.validateUser.bind(this);
  
  ngOnInit(): void {
    
    // if(this.formContent){
    //   console.log(this.formContent);
    //   this.userService.getUser(this.formContent["username"]).subscribe((data:User) => {
    //     this.user = data;
    //   } )
    // }
    
  }

  constructor(private userService: UserService){
  }

  public validateUser(formContent:any):void{
    
    this.userService.getUser(formContent["username"]).subscribe((data:User)=>{
      this.user = data;
    });
  }

}
