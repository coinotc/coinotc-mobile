import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable } from 'rxjs/Rx';
/*
  Generated class for the GetIpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetIpProvider {

  constructor(public http: HttpClient,
    public apiService:ApiServiceProvider) {
    console.log('Hello GetIpProvider Provider');
  }
  public getIP():Observable<any>{
    return this.apiService.getExternal("https://api.ipify.org?format=json")
  }
}
