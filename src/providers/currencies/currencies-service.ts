import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
  Generated class for the CurrenciesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CurrenciesServiceProvider {

  constructor(public http: HttpClient) {
    console.log('CurrenciesProvider ...');
  }

  getCurrencies(){
    return this.http.get('../assets/data/currencies.json',httpOptions)
  }
}