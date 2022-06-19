import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProcessResult } from 'src/app/shared/models/ProcessResult';
import { Project } from 'src/app/shared/models/Project';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  
  constructor(private httpClient:HttpClient) { }

  public GetProjects(username:string):Observable<ProcessResult>{

    return new Observable<ProcessResult>((observer) => {
      this.CallApiGetProject(username).subscribe({
          next:(response:any) => {
            let message:string = "";
            try{
              let result:ProcessResult = {
                process: {
                  name: response["name"]
                },
                success: response["success"],
                code: response["status"],
                data: response["success"] ? response["data"] : "", 
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
                name: "project-validation"
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

  private CallApiGetProject(username:string){
    let apiUrl = "/api/ApiProject/?user=" + username;
    return this.httpClient.get<ProcessResult>(apiUrl);
  }
}

