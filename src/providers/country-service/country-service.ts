import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable} from 'rxjs/Rx';
/*
  Generated class for the CountryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryServiceProvider {

  constructor(public http: HttpClient,
  public apiService:ApiServiceProvider) {
    console.log('Hello CountryServiceProvider Provider');
  }
  getCountries() {
    return this.apiService.getExternal('./assets/data/currencies.json');
  }
}
