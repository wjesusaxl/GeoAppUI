import { Injectable } from '@angular/core';
import Exceptions from 'src/assets/common/exceptions/exceptions.json';
import { Exception } from '../../models/Exception';

@Injectable({
  providedIn: 'root'
})
export class ExceptionSrvService {
  constructor() { }

  public getMessage(type:string, status:string, languageCode:string):Exception{
    let exType = Exceptions[type];
    let ex = exType[status];
    let code = ex["code"];
    let description = ex["message"][languageCode];
  
    return {
      type: type,
      status: status,
      code: code,
      description: description
    };
  }
}
