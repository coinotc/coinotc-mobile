import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { environment } from '../../../environments/environment';
/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProfileServiceProvider {

  private profileURL =  environment.api_url + '/profile';

  constructor(public http: HttpClient) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  
  public createProile(profile){
    console.log(profile)
    return this.http.post(this.profileURL, profile, httpOptions)
  }
  public getProfile(username){
    let URL = `${this.profileURL}?username=${username}`
    return this.http.get<Profile>(URL,httpOptions)
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error || 'backend server error');
    };
  }
}
