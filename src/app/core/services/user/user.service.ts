import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/shared/enums/api-urls';
import { ProcessResult } from 'src/app/shared/models/process-result';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usrSubject = new Subject<ProcessResult>();

  constructor(private httpClient:HttpClient) { }

  public ValidateUser(username:string):Observable<ProcessResult>{

    return new Observable<ProcessResult>((observer) => {
      this.GetUser(username).subscribe({
          next:(response:any) => {

            if(response["success"]){
              
            }
            let procRes:ProcessResult = {
              number: response["status"],
              code: response["message"],
              success: true,
              data: {
                username: response["username"]
                }
            };
            observer.next(response);
          }
        });
    });
    
  }

  private GetUser(username:string){
    let apiUrl = "/api/user.php";
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const body = { username: username }
    return this.httpClient.post<User>(apiUrl, body, { headers });    
  }

}