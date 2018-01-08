import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { adinformation } from '../../models/adinformation'

/*
  Generated class for the AdvertisementServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class AdvertisementServiceProvider {
  private adbuy = 'http://192.168.2.114:4201/api/adbuy';
  private adsell = 'http://192.168.2.114:4201/api/adsell';
  constructor(public http: HttpClient) {
    console.log('Hello AdvertisementServiceProvider Provider');
  }
  public getadbuy(crypto){
    let url = `${this.adbuy}?crypto=${crypto}`
    console.log(url);
    return this.http.get<adinformation[]>(url, httpOptions);
  }
  public addadbuy(information){
    return this.http.post(this.adbuy, information, httpOptions);
  }
  public getadsell(crypto){
    let url = `${this.adsell}?crypto=${crypto}`
    console.log(url);
    return this.http.get<adinformation[]>(url, httpOptions);
  }
  public addadsell(information){
    return this.http.post(this.adsell, information, httpOptions);
  }
}
