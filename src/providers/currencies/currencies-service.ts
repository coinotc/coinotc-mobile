import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
  Generated class for the CurrenciesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CurrenciesServiceProvider {
  constructor(public http: HttpClient) {
    console.log('CurrenciesProvider ...');
  }

  getCurrencies() {
    return this.http.get('../assets/data/currencies.json', httpOptions);
  }
}
