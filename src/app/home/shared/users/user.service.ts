import {Injectable} from '@angular/core';
import {concat, Observable} from 'rxjs';

import {AppEndpoints} from '../../../app-endpoints';
import {HttpService} from '../../../core/http.service';
import {User} from './user.model';
import {UserCredential} from './user-credential.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  create(user: User): Observable<User> {
    const userRequest = this.httpService.post(AppEndpoints.USERS, user);
    return concat(userRequest);
  }

  read(email: string): Observable<User> {
    return this.httpService.get(AppEndpoints.USERS + '/' + email);
  }

  update(email: string, user: User): Observable<User> {
    return this.httpService.put(AppEndpoints.USERS + '/' + email, user);
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(AppEndpoints.USERS_ALL);
  }

  search(email: string, username: string): Observable<User[]> {
    this.httpService.param('email', email ? email : '');
    this.httpService.param('username', username ? username : '');
    return this.httpService.get(AppEndpoints.USERS);
  }

  updatePassword(email: string, newPassword: string): Observable<User> {
    const userCredential: UserCredential = {email, newPassword};
    return this.httpService.patch(AppEndpoints.USER_PASSWORD + '/' + email, userCredential);
  }

  updateRoles(email: string, user: User): Observable<User> {
    return this.httpService.patch(AppEndpoints.USERS + '/' + email, user);
  }
}
