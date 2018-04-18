import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { JwtServiceProvider } from '../jwt-service/jwt-service';

@Injectable()
export class ApiServiceProvider {
  private API_URL = environment.api_url;

  constructor(public http: Http, private jwtService: JwtServiceProvider) {}

  private setHeaders(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (this.jwtService.latestToken) {
      headersConfig['Authorization'] = `Token ${this.jwtService.latestToken}`;
    }
    return new Headers(headersConfig);
  }

  private setHeadersFCM(): Headers {
    let headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'key=AAAALaHfOPI:APA91bFffuUQ4fZrxQ0a7ybjgG5n5560f8YK4XnZj-af_Ir02fhje2563c8Gfmh4ofPDlfHZb7x7n-9JmAMIYId-qr8kIuDe5fNiQF79wvnKGW6Y7Jpcst1wN3a9p2yE_NGR6dPLlW96'
    };
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(
    path: string,
    params: URLSearchParams = new URLSearchParams()
  ): Observable<any> {
    return this.http
      .get(`${this.API_URL}${path}`, {
        headers: this.setHeaders(),
        search: params
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  getExternal(path: string): Observable<any> {
    return this.http
      .get(`${path}`)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${this.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${this.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${this.API_URL}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  postFCM(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${path}`, JSON.stringify(body), { headers: this.setHeadersFCM() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(path): Observable<any> {
    return this.http
      .delete(`${this.API_URL}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}
