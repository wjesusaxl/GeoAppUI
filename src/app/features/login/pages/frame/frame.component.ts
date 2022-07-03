// import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { FormData } from 'src/app/shared/models/FormData';
import Labels from 'src/assets/common/labels/login.json';
import LoginFormData from '../../forms/username.json';
import PswFormData from '../../forms/password.json';
import { FormDataComponent } from 'src/app/shared/components/form-data/form-data.component';
import { FormSrvService } from 'src/app/shared/services/form/form-srv.service';
import { FormStatus} from '../../../../shared/enums/FormStatus';
import { LoginForm } from '../../LoginForm';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { ExceptionSrvService } from 'src/app/shared/services/exception/exception-srv.service';
import { Router } from '@angular/router';
import { Language } from 'src/app/shared/enums/Language';

@Component({
  selector: 'login-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss', '../../scss/frame.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FrameComponent implements OnInit {
 
  public usrForm: FormData = LoginFormData;
  public pswForm: FormData = PswFormData;
  public labels:any = Labels;;
  public language:Language = Language.english;
  @Input() companyCode:string;
  // public extValidateUser = this.validateUser.bind(this);
  public user;
  // @ViewChild("formLogin", { read: ElementRef }) formLogin:ElementRef;
  // @ViewChild("formPassword", { read: ElementRef }) formPassword:ElementRef;
  @ViewChild("formUsername") formUsername:FormDataComponent;
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
    private router:Router,
    private userService: UserService,
    private excService: ExceptionSrvService
    ){
      // this.labels = Labels;
  }

  public TriggerProcess(result:ProcessResult){    
    try{      
      if(!result.success)

        throw new Error(this.excService.getMessage(
          result["process"]["name"],
          result["code"],
          this.language
        )["description"]);

        let process = result["process"];

        if(process["name"] == "get-form-content"){

          if(!("args" in process))
            throw new Error("No args in process.");

          let args = process["args"];

          if(!("action" in args))
            throw new Error("No action in process.");

          let action = args["action"];

          if(["validate-user", "validate-user-password"].includes(action)){
            
            if(!("data" in result))
            throw new Error("No data");
            
            let data = result["data"];

            if(!("email" in data))
              throw new Error("No email was provided.");
            
            let email = data["email"];
            if(action == "validate-user"){

              this.validateUser(email);
              
            }else if(action == "validate-user-password"){
              
              if(!("password" in data))
                throw new Error("No password was provided.");
            
              let password = data["password"];
              this.validateUserPassword("", email, password);

            }
            
          }

        }

      if(process["name"] == "switch-to-form"){      
        this.setFormStatus(LoginForm.Email, [FormStatus.visible, FormStatus.active]);
        this.setFormStatus(LoginForm.Password, []);
        // this.formUsername.SetValues({
        //   username: ""
        // });
      }
        
      // this.userService.ValidateUser(this.companyCode, username).subscribe((response:any)=>{
      //   if(response["success"]){
      //     this.setFormStatus(LoginForm.Username, [FormStatus.hidden]);
      //     this.setFormStatus(LoginForm.Password, [FormStatus.active, FormStatus.visible]);
      //     this.formPassword.SetValues({
      //       username: username
      //     });
      //   }else{
      //     this.formUsername.DisplayProcessMessage(
      //       response["message"]
      //     );    
      //   }
      // });
        
      
    }catch(ex){
      this.formUsername.DisplayProcessMessage(String(ex));
    }
    
    
    
  }

  public switchToForm(){
    
  }

  public validateUser(email:string){
    this.userService.ValidateUser(this.companyCode, email).subscribe((response:any)=>{
      if(response["success"]){
        
        this.setFormStatus(LoginForm.Email, [FormStatus.hidden]);
        this.setFormStatus(LoginForm.Password, [FormStatus.active, FormStatus.visible]);        
        this.formPassword.SetValues({
          email: email
        });
        this.formPassword.SetFocus1stElement();
      }else{
        let message = this.excService.getMessage(
          response["process"]["name"],
          response["code"],
          this.language
        )["description"];
        console.log("Message", message);
        this.formUsername.DisplayProcessMessage(message);    
      }
    });
  }

  public validateUserPassword(companyCode:string, email:string, password:string){
    this.userService.ValidateUser(companyCode, email, password).subscribe((response:any)=>{
      if(!response["success"]){
        this.router.navigate(['']);
      }else{
        this.formPassword.DisplayProcessMessage(
          this.excService.getMessage(
            response["process"]["name"],
            response["code"],
            this.language
          )["description"]
        );    
      }
      
    });
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
    
    this.formUsernameClasses = loginForm == LoginForm.Email ? formClasses : this.formUsernameClasses;
    this.formPasswordClasses = loginForm == LoginForm.Password ? formClasses : this.formPasswordClasses;
  }

}
