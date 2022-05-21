import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { environment } from 'src/environments/environment';
import { ApiUrls } from 'src/app/shared/enums/api-urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public getUser(username:string):Observable<User>{
    let apiUrl = environment.apiURL + ApiUrls.User;
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const body = { username: username }
    return this.httpClient.post<User>(apiUrl, body, { headers });
  }
}
