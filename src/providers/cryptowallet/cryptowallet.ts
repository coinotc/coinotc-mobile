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

  constructor(private apiService: ApiServiceProvider) {
    console.log('Hello CryptowalletProvider Provider');
  }

  public getWalletInfo():Observable<any> {
    return this.apiService.get("/wallet/wallet-info")
  }

  public getWalletBalance(id, type): Observable<any> {
    return this.apiService.get(`/wallet/balance/${id}/${type}`)
  }

}
