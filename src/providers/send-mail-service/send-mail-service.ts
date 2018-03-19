import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
/*
  Generated class for the SendMailServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class SendMailServiceProvider {
  private sendMailURL =  environment.api_url + '/sendmail';
  constructor(public http: HttpClient) {
    console.log('Hello SendMailServiceProvider Provider');
  }
  public sendMail(email){
    let URL = `${this.sendMailURL}?eamil=${email}`
    return this.http.get(URL, httpOptions);
  }
}
