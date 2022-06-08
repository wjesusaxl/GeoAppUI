import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSrvService {

  private formSubject = new Subject<any>();
  constructor() { }

  GetProcess(data:any){
    this.formSubject.next(data);
  }

  ReturnProcess():Observable<any>{
    return this.formSubject.asObservable();
  }
}
