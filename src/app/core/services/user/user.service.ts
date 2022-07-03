import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, of } from 'rxjs';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public ValidateUser(company:string, email:string, password:string = "*|*"):Observable<ProcessResult>{

    let apiUrl = environment.apiURL + "/token/"
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const body = { 
      email: email,
      password: password
    }
  
    return new Observable<ProcessResult>((observer) => {
      this.httpClient.post<User>(apiUrl, body, { headers }).subscribe({
        next:(response) =>{
          
          let result:ProcessResult = {
            process: {
              name: response["operation"]
            },
            success: true,
            data: response["data"],
            message: response["details"],
            code: "200"
          }
          observer.next(result);
        },
        error(err){
          console.log("Error", err);
          let result:ProcessResult = {
            process: {
              name: "user-validation"
            },
            success: false,
            code: err["code"],
            message: err["error"]["detail"]
          }
          try{
            result["code"] = "code" in err["error"] ? err["error"]["code"] : err["status"];
            result["message"] = err["message"];
          }
          catch(ex){
            result["code"] = err["status"];
            result["message"] = "error";
          }
          
          observer.next(result);  
        }
        
      })
    });

  }

  // public ValidateUser(companyCode:string, username:string):Observable<ProcessResult>{

  //   return new Observable<ProcessResult>((observer) => {
  //     this.GetUser(companyCode, username).subscribe({
  //         next:(response) => {
  //           console.log("Service response", response);
  //           let message:string = "";
  //           try{
  //             let result:ProcessResult = {
  //               process: {
  //                 name: response["operation"]
  //               },
  //               success: response["success"],
  //               code: response["status"],
  //               data: {
  //                 username: username,
  //                 companyCode: companyCode
  //               }, 
  //               message: response["success"] ? response["message"] : ""
  //             }
  //             observer.next(result);
  //           }catch(ex){
  //             console.log(ex);
  //           }
  //         },
  //         error(msg){
  //           let result:ProcessResult = {
  //             process: {
  //               name: "user-validation"
  //             },
  //             success: false,
  //             code: "500",
  //             message: msg["message"]
  //           }
  //           observer.next(result);
  //         }
  //       });
  //   });
   
  // }

  // public ValidateUserPassword(username:string, password:string):Observable<ProcessResult>{
  //   return new Observable<ProcessResult>((observer) => {
  //     this.CallAPIToken(username, password).subscribe({
  //       next:(response:any) => {
  //         try{
  //           let result:ProcessResult = {
  //             process:{
  //               name: "user-validation"
  //             },
  //             success: response["success"],
  //             code: response["status"],
  //             data: response,
  //             message: response["success"] ? response["message"] : ""
  //           }
  //           observer.next(result);
  //         }catch(ex){
  //           console.log(ex);
  //         }
  //       },
  //       error(msg:string){
  //         let result:ProcessResult = {
  //           process: {
  //             name: "user-validation"
  //           },
  //           success: false,
  //           code: "500",
  //           message: msg["message"]
  //         }
  //         observer.next(result);
  //       }
  //     });
  //   });
  // }


  // private GetUser(companyCode:string, username:string){
  //   let apiUrl = environment.apiURL + "/token/"
  //   const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  //   const body = { 
  //     email: username,
  //     password: "*|*" 
  //   }
  //   return this.httpClient.post<User>(apiUrl, body, { headers });
  // }

  // private CallAPIToken(username:string, password:string){
  //   let apiUrl = environment.apiURL + "/token/"
  //   const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  //   const body = { 
  //     email: username,
  //     password: password 
  //   }
  //   return this.httpClient.post<User>(apiUrl, body, { headers }); 
    
  // }

}
