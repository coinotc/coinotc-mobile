import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable} from 'rxjs/Rx';
/*
  Generated class for the SendMailServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SendMailServiceProvider {
  private sendMailURL =  '/sendmail';
  constructor(public apiService: ApiServiceProvider) {
    console.log('Hello SendMailServiceProvider Provider');
  }
  public sendMail(email,secretToken){
    let URL = `${this.sendMailURL}?email=${email}&secretToken=${secretToken}`
    return this.apiService.post(URL,{type:1});
  }
}
