import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiServiceProvider } from '../api-service/api-service';
import { JwtServiceProvider } from '../jwt-service/jwt-service';
import { User } from '../../models/user.model';


/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: Http,
    private apiService: ApiServiceProvider,
    private jwtService: JwtServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }

  populate() {
    // If JWT detected, attempt to get & store user's info
    this.jwtService.getToken().then(token => {
      if (token) {
        this.apiService.get('/user')
          .subscribe(
          data => this.setAuth(data.user),
          err => this.purgeAuth()
          );
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
      }
    });
  }


  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token).then(()=>{
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticatedSubject.next(true);
    });
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken().then(()=>{
      // Set current user to an empty object
      this.currentUserSubject.next(new User());
      // Set auth status to false
      this.isAuthenticatedSubject.next(false);
    });
  }

  attemptAuth(type, credentials): Observable<User> {
    let route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, { user: credentials })
      .map(data => {
          this.setAuth(data.user);
          return data;
        });
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
      .put('/user', { user })
      .map(data => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      });
  }

}
