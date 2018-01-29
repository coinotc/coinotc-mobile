import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
/*
  Generated class for the ComplainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class ComplainServiceProvider {
  private complainURL =  environment.api_url + '/complain';
  constructor(public http: HttpClient) {
    console.log('Hello ComplainServiceProvider Provider');
  }
  public sendComplain(complain){
    return this.http.post(this.complainURL, complain , httpOptions);
  }
}
