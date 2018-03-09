import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Rx';
import { OrderInformation } from '../../pages/order-window/orderInformation';
import { environment } from '../../../environments/environment';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderServiceProvider {
  private orderURL = environment.api_url + '/order';

  constructor(public httpClient: HttpClient) {
    console.log('Hello OrderServiceProvider Provider');
  }

  public getBuyerOrders(username, finished) {
    let getURL = `${
      this.orderURL
    }/buyer?username=${username}&finished=${finished}`;
    return this.httpClient.get<OrderInformation[]>(getURL, httpOptions);
  }

  public getSellerOrders(username, finished) {
    let getURL = `${
      this.orderURL
    }/seller?username=${username}&finished=${finished}`;
    return this.httpClient.get<OrderInformation[]>(getURL, httpOptions);
  }

  public updateOrder(order) {
    return this.httpClient.put(this.orderURL, order, httpOptions);
  }
  public postorder(order) {
    return this.httpClient.post(this.orderURL, order, httpOptions);
  }
}
