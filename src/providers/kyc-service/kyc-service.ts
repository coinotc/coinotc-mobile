import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiServiceProvider } from '../api-service/api-service';
import { catchError } from 'rxjs/operators';
/*
  Generated class for the KycServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KycServiceProvider {

  constructor(public http: HttpClient,
    public apiService: ApiServiceProvider) {
    console.log('Hello KycServiceProvider Provider');
  }
  uploadSelfiePhoto(input:any) {
    //console.log(file.get('key'))
    var KYCUrl = '/users/kyc/selfiePhoto'
    return this.apiService.patch(KYCUrl, {input:input})
  }
  uploadPassportPhoto(input:any) {
    //console.log(file.get('key'))
    //console.log(file.get('photo'))
    console.log("")
    var KYCUrl = '/users/kyc/passportPhoto'
    return this.apiService.patch(KYCUrl, {input:input})
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("Error"+JSON.stringify(error.error));
      return Observable.throw(error  || 'backend server error');
    };
  }
  verifyName(credentials) {
    var KYCUrl = '/users/kyc/verifyName'
    return this.apiService.patch(KYCUrl, credentials)
  }

}
