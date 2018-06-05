import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { complain } from '../../models/complain';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable} from 'rxjs/Rx';
/*
  Generated class for the ComplainServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ComplainServiceProvider {
  private complainURL = '/complain';
  constructor(public apiService: ApiServiceProvider) {
    console.log('Hello ComplainServiceProvider Provider');
  }
  public sendComplain(complain){
    let URL = `${this.complainURL}/sendComplain`
    return this.apiService.post(URL, complain);
  }
  public getComplains(username) : Observable<complain[]>{
    let url = `${this.complainURL}?username=${username}`;
    return this.apiService.get(url);
  }
  public getCurrentComplain(id){
    let url = `${this.complainURL}/getCurrentComplain?_id=${id}`;
    return this.apiService.get(url);
  }
  public changeStatus(id, status) {
    let url = `/complain/changeStatus`;
    return this.apiService.patch(url, { id: id, status: status });
  }
  public patchnewMessage(id,message){
    let url = `/complain/updateMessage`;
    return this.apiService.patch(url,{id:id,message:message});
  }
  public addRoomKey(roomkey,complainId){
    let URL = `${this.complainURL}/roomkey`;
    return this.apiService.patch(URL, {roomkey:roomkey,complainId:complainId});
  }
}
