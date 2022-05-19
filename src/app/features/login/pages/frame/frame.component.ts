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
  public formContent:any;
  
  ngOnInit(): void {
    // this.userService.getUser().subscribe((data:User) => {
    //   this.user = data;
    // } )
  }

  constructor(private userService: UserService){
  }

  validateUser(formContent:any){
    this.userService.getUser().subscribe((data:User)=>{

      this.user = data;
    });    
    
  }

}
