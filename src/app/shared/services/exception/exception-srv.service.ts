import { Injectable } from '@angular/core';
import Exceptions from 'src/assets/common/exceptions/exceptions.json';
import { Language } from '../../enums/Language';
import { Exception } from '../../models/Exception';

@Injectable({
  providedIn: 'root'
})
export class ExceptionSrvService {
  constructor() { }

  public getMessage(type:string, status:string, languageCode:Language):Exception{
    status = Number(status) === 0 ? "500" : status;
    let ex:Exception = {
      type: type,
      description: "",
      code: "",
      status: status
    }    
    try{      
      let exType = Exceptions[type];
      ex["code"] = exType[status]["code"];
      ex["description"] = exType[status]["message"][languageCode];
    }catch(e){      
      ex["description"] = Exceptions["unknown"]["500"][languageCode];
    }    
    return ex;
  }
}
