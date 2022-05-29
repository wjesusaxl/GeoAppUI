// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { FormData } from 'src/app/shared/models/form-data';
import LoginFormData from '../../forms/username.json';
import PswFormData from '../../forms/password.json';
import { FormDataComponent } from 'src/app/shared/components/form-data/form-data.component';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss', '../../scss/frame.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameComponent implements OnInit {
 
  public usrForm: FormData = LoginFormData;
  public pswForm: FormData = PswFormData;
  public extValidateUser = this.validateUser.bind(this);
  public user;
  @ViewChild("formLogin", { read: ElementRef }) formLogin:ElementRef;
  @ViewChild("formPassword", { read: ElementRef }) formPassword:ElementRef;
  @ViewChild("formPassword") formPasswordC:FormDataComponent;

  formLoginClasses = ['active'];
  formPasswordClasses = [];
  
  ngOnInit(): void {
    
  }

  constructor(
    private userService: UserService
    ){
      
  }

  public validateUser(formContent:any):void{
    let username = formContent["username"];
    this.userService.getUser(username).subscribe((data:any)=>{

      try{
        if(!("processResult" in data))
        throw new Error("Wrong data structure");
          let processResult = data["processResult"];

        if(processResult["resultCode"] !== "01")
          throw new Error(processResult["resultDescription"]);

        if(!("data" in data))
          throw new Error("wrong data structure");
      
        let user = data["data"];

        if(user["username"] !== username)
          throw new Error("User not found.");

        if(this.formLogin.nativeElement.classList.contains('active')){
          this.formLogin.nativeElement.classList.remove('active');
          this.formLogin.nativeElement.classList.add('hidden');
        }

        this.formPassword.nativeElement.classList.add('active');
        this.formPasswordC.SetValues({
          username: username,
          password: ""
        });
        
          
      }
      catch(ex){
        this.user = ex;
      }
    });
  }

}
