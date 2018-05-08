import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the GoogleAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleAuthServiceProvider {
  constructor(public http: HttpClient,
    public apiService:ApiServiceProvider) {
    console.log('Hello GoogleAuthServiceProvider Provider');
  }
  public getBackupKey(username):Observable<string>{
    let url = `/2fa?username=${username}`;
    return this.apiService.get(url);
  }
  public sendSixCode(credentials){
    let url = "/2fa?username";
    console.log(credentials)
    return this.apiService.post(url,{credentials:credentials});
  }
  public unbind(credentials){
    let url = "/2fa?username";
    console.log(credentials)
    return this.apiService.patch(url,{credentials:credentials});
  }
}
