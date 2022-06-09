import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/shared/enums/api-urls';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { User } from 'src/app/shared/models/User';
import { ExceptionSrvService } from 'src/app/shared/services/exception/exception-srv.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usrSubject = new Subject<ProcessResult>();

  constructor(
    private httpClient:HttpClient,
    private excService:ExceptionSrvService
    ) 
    { }

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
                message: response["success"] ? response["message"] : this.excService.getMessage(
                  response["validate"],
                  response["status"],
                  "eng"
                )["description"]
              }
              observer.next(result);
            }catch(ex){
              console.log(ex);
            }
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
                name: "api-token"
              },
              success: true,
              code: "100",
              data: response,
              message: "ok"
            }
            observer.next(result);
          }catch(ex){
            console.log(ex);
          }
        }
      });
    });
  }

  private GetUser(companyCode:string, username:string){
    let apiUrl = "/api/ApiUserRegister/" + companyCode + "/" + username + "/";
    // let apiUrl = "/api/ApiUserRegister/?companyCode=" + companyCode + "&username=" + username;
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
