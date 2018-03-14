import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Alert } from '../../models/alert';

/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AlertServiceProvider {
  private alertURL = environment.api_url + '/alert';

  constructor(public httpClient: HttpClient) {
    console.log('Hello AlertServiceProvider Provider');
  }

  public getAlerts(username, crypto) {
    let getURL = `${this.alertURL}?username=${username}&crypto=${crypto}`;
    return this.httpClient.get<Alert[]>(getURL, httpOptions);
  }

  public postAlert(alert) {
    return this.httpClient.post(this.alertURL, alert, httpOptions);
  }
}
