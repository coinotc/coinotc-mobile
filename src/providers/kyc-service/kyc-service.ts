import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiServiceProvider } from '../api-service/api-service';
/*
  Generated class for the KycServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KycServiceProvider {

  constructor(public http: HttpClient,
  public apiService:ApiServiceProvider) {
    console.log('Hello KycServiceProvider Provider');
  }
  submitKYC(credentials,files:any){
   var KYCUrl ='/users/kyc'
    return this.apiService.patch(KYCUrl, {credentials:credentials,files:files})
 }
}
