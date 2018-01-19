import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { environment } from '../../../environments/environment';
import { UserServiceProvider } from '../user-service/user-service';
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
  currentUserName = this.userService.getCurrentUser().username;
  private profileURL =  environment.api_url + '/users/public';

  constructor(public http: HttpClient,
    private userService: UserServiceProvider) {
    console.log('Hello ProfileServiceProvider Provider');
  }
  
  public getProfile(username){
    let URL = `${this.profileURL}?username=${username}`;
    return this.http.get<Profile>(URL,httpOptions)
  }
  // public getBlock(username){
  //   //let currentUserName = this.userService.getCurrentUser().username;
  //   let URL = `${this.profileURL}/block?username=${username}&currentUserName=${this.currentUserName}`;
  //   return this.http.get(URL,httpOptions)
  // }
  // public getFollow(username){
  //   //let currentUserName = this.userService.getCurrentUser().username;
  //   console.log(this.currentUserName);
  //   let URL = `${this.profileURL}/follow?username=${username}&currentUserName=${this.currentUserName}`;
  //   return this.http.get(URL,httpOptions)
  // }
  public sendBlock(username,block){
    let URL = `${this.profileURL}/block?username=${username}`;
    return this.http.patch(URL,block,httpOptions)
  }
  public sendFollowing(username,following){
    let URL = `${this.profileURL}/follow?username=${username}`;
    return this.http.patch(URL,following,httpOptions)
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error || 'backend server error');
    };
  }
}
