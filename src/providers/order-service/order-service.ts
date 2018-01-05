import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { OrderInformation } from '../../pages/order-window/orderInformation';


/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class OrderServiceProvider {

  private orderURL = 'http://localhost:4201/api/order';

  constructor(public http: HttpClient) {
    console.log('Hello OrderServiceProvider Provider');
  }

  public getOrders(url){
    var getURL = this.orderURL;
    if(url){
      getURL = url ;
    }
    return this.http.get<OrderInformation[]>(getURL,httpOptions)
    .pipe(catchError(this.handleError<OrderInformation[]>('getOrders')))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error || 'backend server error');
    };
  }

}
