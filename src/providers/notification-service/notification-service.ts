import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationServiceProvider {
  private notificationURL = '/notification';

  constructor(public apiService: ApiServiceProvider) {
    console.log('Hello NotificationServiceProvider Provider');
  }

  public getNotifications(username) {
    let getURL = `${this.notificationURL}?username=${username}`;
    return this.apiService.get(getURL);
  }

  public deleteNotifications(_id) {
    let deleteURL = `${this.notificationURL}?_id=${_id}`;
    return this.apiService.delete(deleteURL);
  }
}
