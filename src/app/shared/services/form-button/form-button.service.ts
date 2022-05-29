import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormButtonService {

  private subject = new Subject();

  constructor() { }

  sendEvent(data:any){
    this.subject.next(data);
  }

  triggerSendEvent(): Observable<any>{
    return this.subject.asObservable();
  }

}
