import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Alert } from '../../models/alert';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable} from 'rxjs/Rx';


/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class AlertServiceProvider {
  private alertURL = '/alert';

  constructor(public apiService: ApiServiceProvider) {
    console.log('Hello AlertServiceProvider Provider');
  }

  public onNotification(notification) {
    let postURL = 'https://fcm.googleapis.com/fcm/send';
    return this.apiService.postFCM(postURL, notification);
  }

  public getAlerts(username, crypto) :  Observable<Alert[]> {
    let getURL = `${this.alertURL}?username=${username}&crypto=${crypto}`;
    return this.apiService.get(getURL);
  }

  public getAbove(above, status, fiat, crypto, price) :  Observable<Alert[]>{
    let getURL = `${
      this.alertURL
    }/getAbove?above=${above}&status=${status}&fiat=${fiat}&crypto=${crypto}&price=${price}`;
    return this.apiService.get(getURL);
  }

  public getBelow(above, status, fiat, crypto, price) :  Observable<Alert[]>{
    let getURL = `${
      this.alertURL
    }/getBelow?above=${above}&status=${status}&fiat=${fiat}&crypto=${crypto}&price=${price}`;
    return this.apiService.get(getURL);
  }

  public postAlert(alert) {
    return this.apiService.post(this.alertURL, alert);
  }

  public updateAlert(alert) {
    return this.apiService.put(this.alertURL, alert);
  }

  // public deleteAlert(alert) {
  //   let deleteParams = new HttpParams().set('_id', alert._id);
  //   return this.apiService.delete(this.alertURL, { params: deleteParams });
  // }
}
