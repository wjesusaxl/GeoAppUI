import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public getUser(username:string):Observable<User>{

    console.log("GetUser", username);
    
    let apiUrl = "http://192.168.18.192/Test/API/user.php";
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const body = { username: username }
    return this.httpClient.post<User>(apiUrl, body, { headers });
  }
}
