import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
/*
  Generated class for the GoogleAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class GoogleAuthServiceProvider {
  private googleAuthURL =  environment.api_url + '/2fa';
  constructor(public http: HttpClient) {
    console.log('Hello GoogleAuthServiceProvider Provider');
  }
  public getBackupKey(username){
    let url = `${this.googleAuthURL}?username=${username}`;
    return this.http.get(url,httpOptions);
  }
}
