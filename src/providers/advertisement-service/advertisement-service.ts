import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Rx';
import { adinformation } from '../../models/adinformation'
import { environment } from '../../../environments/environment';
import { UserServiceProvider } from '../../providers/user-service/user-service';
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
  private adbuy = environment.api_url + '/guanggao/buy';
  private adsell = environment.api_url + '/guanggao/sell';
  constructor(public http: HttpClient,
  private userService:UserServiceProvider) {
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
  public getMyadvertisement(){
    let currentUserName = this.userService.getCurrentUser().username;
    let URL = environment.api_url + `/guanggao/myadvertisement?currentUserName=${currentUserName}`;
    return this.http.get<adinformation[]>(URL,httpOptions)
  }
  public getprice(type,fiat){
    let url = `https://api.coinmarketcap.com/v1/ticker/${type}/?convert=${fiat}`;
    return this.http.get(url);
  }
}
