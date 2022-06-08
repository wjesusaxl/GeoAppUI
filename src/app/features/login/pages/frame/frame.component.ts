// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormData } from 'src/app/shared/models/FormData';
import LoginFormData from '../../forms/username.json';
import PswFormData from '../../forms/password.json';
import { FormDataComponent } from 'src/app/shared/components/form-data/form-data.component';
import { FormSrvService } from 'src/app/shared/services/form/form-srv.service';
import { FormStatus} from '../../../../shared/enums/FormStatus';
import { LoginForm } from '../../LoginForm';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { ExceptionSrvService } from 'src/app/shared/services/exception/exception-srv.service';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss', '../../scss/frame.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FrameComponent implements OnInit {
 
  public usrForm: FormData = LoginFormData;
  public pswForm: FormData = PswFormData;
  // public extValidateUser = this.validateUser.bind(this);
  public user;
  // @ViewChild("formLogin", { read: ElementRef }) formLogin:ElementRef;
  // @ViewChild("formPassword", { read: ElementRef }) formPassword:ElementRef;
  @ViewChild("formLogin") formUser:FormDataComponent;
  @ViewChild("formPassword") formPassword:FormDataComponent;

  formUsernameClasses = {
    visible: true,
    active: true,
    inactive: false,
    hidden: false
  };

  formPasswordClasses = {
    visible: false,
    active: false,
    inactive: false,
    hidden: false
  };

  ngOnInit(): void {
    
  }

  constructor(
    private userService: UserService,
    private formService: FormSrvService
    ){
      
  }

  public TriggerEvent(result:ProcessResult){
    try{
      
      console.log("Result: ", result);
      if(!result.success)
        throw new Error(result.message);
      
      if(!("data" in result))
        throw new Error("error");

      let data = result["data"];

      if("validate-user" in result)
        this.validateUser(data);


      // this.userService.ValidateUser("wjesusaxl").subscribe((data:any)=>{

      // });
      
      // this.setFormStatus(LoginForm.Username, [FormStatus.inactive]);
      // this.setFormStatus(LoginForm.Password, [FormStatus.active, FormStatus.visible]);
      
    }catch(ex){
      this.formUser.DisplayProcessMessage(String(ex));
    }
    
    
    
  }

  public switchToForm(){
    
  }

  public validateUser(data:any){
    console.log(data);
  }

  public validateUser2(formContent:any):void{


    // let username = formContent["username"];
    // this.userService.ValidateUser(username).subscribe((data:any)=>{
    //   try{
    //     console.log("Data", data);
    //     if(!("processResult" in data))
    //     throw new Error("Wrong data structure");
    //       let processResult = data["processResult"];

    //     if(processResult["resultCode"] !== "01")
    //       throw new Error(processResult["resultDescription"]);

    //     if(!("data" in data))
    //       throw new Error("wrong data structure");
      
    //     let user = data["data"];

    //     if(user["username"] !== username)
    //       throw new Error("User not found.");

    //     if(this.formLogin.nativeElement.classList.contains('active')){
    //       this.formLogin.nativeElement.classList.remove('active');
    //       this.formLogin.nativeElement.classList.add('hidden');
    //     }

    //     this.formPassword.nativeElement.classList.add('active');
    //     this.formPasswordC.SetValues({
    //       username: username,
    //       password: ""
    //     });
        
          
    //   }
    //   catch(ex){
    //     this.user = ex;
    //   }
    // });
  }

  setFormStatus(loginForm:LoginForm, formStatusList:FormStatus[]){
    let formClasses = {
      active: formStatusList.includes(FormStatus.active),
      hidden: formStatusList.includes(FormStatus.hidden),
      visible: formStatusList.includes(FormStatus.visible),
      inactive: formStatusList.includes(FormStatus.inactive)
    };

    this.formUsernameClasses = loginForm == LoginForm.Username ? formClasses : this.formUsernameClasses;
    this.formPasswordClasses = loginForm == LoginForm.Password ? formClasses : this.formPasswordClasses;
  }

}
