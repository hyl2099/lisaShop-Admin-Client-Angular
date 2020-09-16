import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';


@Injectable()
export class TokensService {
  static END_POINT = '/users/token';


  constructor(private httpService: HttpService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.httpService.login(email, password, TokensService.END_POINT);
  }

  logout() {
    return this.httpService.logout();
  }

  getEmail(): string {
    return this.httpService.getToken() ? this.httpService.getToken().email : undefined;
  }

  getName(): string {
    return this.httpService.getToken() ? this.httpService.getToken().name : '???';
  }
}
