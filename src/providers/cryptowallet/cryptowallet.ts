import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the CryptowalletProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CryptowalletProvider {
  APP_URI : string = '/wallet/';

  constructor(private apiService: ApiServiceProvider) {
    console.log('Hello CryptowalletProvider Provider');
  }

  public getWalletInfo():Observable<any> {
    return this.apiService.get(`${this.APP_URI}wallet-info`)
  }

  public getTransactionHistory(type):Observable<any> {
    return this.apiService.get(`${this.APP_URI}transaction-history?type=${type}`)
  }

  public transfer(transfer):Observable<any> {
    return this.apiService
      .post(`${this.APP_URI}withdrawal`, transfer)
      .map(data => {
        console.log('----> transfer');
      return data;
    });
  }

 

  public getWalletBalance(id, type): Observable<any> {
    return this.apiService.get(`/wallet/balance/${id}/${type}`)
  }

}
