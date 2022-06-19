import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, of } from 'rxjs';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public ValidateUser(companyCode:string, username:string):Observable<ProcessResult>{

    return new Observable<ProcessResult>((observer) => {
      this.GetUser(companyCode, username).subscribe({
          next:(response:any) => {
            let message:string = "";
            try{
              let result:ProcessResult = {
                process: {
                  name: response["validate"]
                },
                success: response["success"],
                code: response["status"],
                data: {
                  username: username,
                  companyCode: companyCode
                }, 
                message: response["success"] ? response["message"] : ""
              }
              observer.next(result);
            }catch(ex){
              console.log(ex);
            }
          },
          error(msg){
            let result:ProcessResult = {
              process: {
                name: "user-validation"
              },
              success: false,
              code: "500",
              message: msg["message"]
            }
            observer.next(result);
          }
        });
    });
   
  }

  public ValidateUserPassword(username:string, password:string):Observable<ProcessResult>{
    return new Observable<ProcessResult>((observer) => {
      this.CallAPIToken(username, password).subscribe({
        next:(response:any) => {
          try{
            let result:ProcessResult = {
              process:{
                name: "user-validation"
              },
              success: response["success"],
              code: response["status"],
              data: response,
              message: response["success"] ? response["message"] : ""
            }
            observer.next(result);
          }catch(ex){
            console.log(ex);
          }
        },
        error(msg:string){
          let result:ProcessResult = {
            process: {
              name: "user-validation"
            },
            success: false,
            code: "500",
            message: msg["message"]
          }
          observer.next(result);
        }
      });
    });
  }

  private GetUser(companyCode:string, username:string){
    // let apiUrl = "/api/ApiUserRegister/" + companyCode + "/" + username + "/";
    let apiUrl = "/api/ApiUserRegister/?companyCode=" + companyCode + "&username=" + username;
    // const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    // const body = { username: username }
    // return this.httpClient.post<User>(apiUrl, body, { headers });    
    return this.httpClient.get<User>(apiUrl);
  }

  private CallAPIToken(username:string, password:string){
    let apiUrl = "/api/token/";
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const body = { 
      username: username,
      password: password 
    }
    return this.httpClient.post<User>(apiUrl, body, { headers });    
    
  }

}
