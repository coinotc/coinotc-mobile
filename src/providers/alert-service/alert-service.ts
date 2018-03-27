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
const notificationHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAACVHLBO0:APA91bFTeWrJGpHS7SThKBSRjaxv2EUnoQ56IviM8QlOv_dKU_OOZ8KArka5ObvBwBnxZD7GqOciuvKjvu0oYnLph391RJSkhQVCfU7SntCzhXO4rr3GNfzpfment_9FzjBwVUX7Gd_z'
  })
};

@Injectable()
export class AlertServiceProvider {
  private alertURL = environment.api_url + '/alert';

  constructor(public httpClient: HttpClient) {
    console.log('Hello AlertServiceProvider Provider');
  }

  public onNotification(notification) {
    let postURL = 'https://fcm.googleapis.com/fcm/send';
    return this.httpClient.post(postURL, notification, notificationHttpOptions);
  }

  public getAlerts(username, crypto) {
    let getURL = `${this.alertURL}?username=${username}&crypto=${crypto}`;
    return this.httpClient.get<Alert[]>(getURL, httpOptions);
  }

  public getAbove(above, status, fiat, crypto, price) {
    let getURL = `${
      this.alertURL
    }/getAbove?above=${above}&status=${status}&fiat=${fiat}&crypto=${crypto}&price=${price}`;
    return this.httpClient.get<Alert[]>(getURL, httpOptions);
  }

  public getBelow(above, status, fiat, crypto, price) {
    let getURL = `${
      this.alertURL
    }/getBelow?above=${above}&status=${status}&fiat=${fiat}&crypto=${crypto}&price=${price}`;
    return this.httpClient.get<Alert[]>(getURL, httpOptions);
  }

  public postAlert(alert) {
    return this.httpClient.post(this.alertURL, alert, httpOptions);
  }

  public updateAlert(alert) {
    return this.httpClient.put(this.alertURL, alert, httpOptions);
  }
}
