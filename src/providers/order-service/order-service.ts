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

  private orderURL = 'http://192.168.2.106:4201/api/order';

  constructor(public httpClient: HttpClient) {
    console.log('Hello OrderServiceProvider Provider');
  }

  public getOrders(finished){
    let getURL = `${this.orderURL}?finished=${finished}`
    return this.httpClient.get<OrderInformation[]>(getURL,httpOptions)
    .pipe(catchError(this.handleError<OrderInformation[]>('getOrders')))
  }

  public updateOrder(order){
    return this.httpClient.put(this.orderURL, order, httpOptions)
      .pipe(catchError(this.handleError<OrderInformation>('updateOrder')))
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return Observable.throw(error || 'backend server error');
    };
  }

}
