import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
import {Token} from './token.model';
import {Error} from './error.model';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class HttpService {
  static API_END_POINT = environment.API;
  static UNAUTHORIZED = 401;
  static CONNECTION_REFUSE = 0;
  static NOT_FOUND = 404;

  private token: Token;
  private headers: HttpHeaders;
  private params: HttpParams;
  // responseType值的类型可为如下 arraybuffer	ArrayBuffer对象
  // blob	Blob对象
  // document	Document对象
  // json	JavaScript object, parsed from a JSON string returned by the server
  private responseType: string;
  private successfulNotification = undefined;


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.resetOptions();
  }

  login(email: string, password: string, endPoint: string): Observable<any> {
    return this.authBasic(email, password).post(endPoint).pipe(
      map(token => {
        this.token = token;
        this.token.email = new JwtHelperService().decodeToken(token.token).user;
        this.token.name = new JwtHelperService().decodeToken(token.token).name;
      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  logout() {
    this.token = undefined;
    this.router.navigate(['']);
  }

  getToken(): Token {
    return this.token;
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value); // This class is immutable
    return this;
  }


  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  photo(): HttpService {
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf , application/json');
    return this;
  }
  // 书写不规范，获取文件夹中全部图片。
  getImages():Observable<any>{
    return this.http.get('http://localhost:8080/getImages');
  }

  // 书写不规范，获取全部图片全部信息。
  getPictures():Observable<any>{
    return this.http.get('http://localhost:8080/pictures');
  }

  post(endpoint: string, body?: object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  patch(endpoint: string, body?: object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  private header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value); // This class is immutable
    return this;
  }

  private authBasic(email: string, password: string): HttpService {
    return this.header('Authorization', 'Basic ' + btoa(email + ':' + password));
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private createOptions(): any {
    if (this.token !== undefined) {
      this.header('Authorization', 'Bearer ' + this.token.token);
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private extractData(response): any {
    if (this.successfulNotification) {
      this.snackBar.open(this.successfulNotification, '', {
        duration: 2000
      });
      this.successfulNotification = undefined;
    }
    const contentType = response.headers.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/images') !== -1) {
        const blob = new Blob([response.body], {type: 'application/images'});
        window.open(window.URL.createObjectURL(blob));
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    } else {
      return response;
    }
  }

  private handleError(response): any {
    let error: Error;
    if (response.status === HttpService.UNAUTHORIZED) {
      this.snackBar.open('Unauthorized', 'Error', {duration: 5000});
      this.logout();
      this.router.navigate(['']);
      return EMPTY;
    } else if (response.status === HttpService.CONNECTION_REFUSE) {
      this.snackBar.open('Connection Refuse', 'Error', {duration: 5000});
      return EMPTY;
    } else if (response.status === HttpService.NOT_FOUND) {
      error = {error: 'Not Found', message: '', path: ''};
      this.snackBar.open(error.error + ': ' + error.message, 'Info', {duration: 2000});
      return throwError(error);
    } else {
      try {
        error = response.error; // with 'text': JSON.parse(response.error);
        this.snackBar.open(error.error + ' (' + response.status + '): ' + error.message, 'Error', {duration: 10000});
        return throwError(error);
      } catch (e) {
        this.snackBar.open('Not response', 'Error', {duration: 10000});
        return throwError(response.error);
      }
    }
  }

}
