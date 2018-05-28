import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiServiceProvider } from '../api-service/api-service';
/*
  Generated class for the ServersideTimeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServersideTimeServiceProvider {

  constructor(public http: HttpClient,
  private apiService:ApiServiceProvider) {
    console.log('Hello ServersideTimeServiceProvider Provider');
  }
  public getOffsetSeconds():Observable<number>{
    let URL = '/serverside-time';
    return this.apiService.get(URL)
  }
}
