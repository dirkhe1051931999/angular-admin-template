import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu } from '@core';
import { delay, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { base64, currentTimestamp, filterObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  private user: User = {
    id: 1,
    username: 'ng-matero',
    password: 'ng-matero',
    name: 'Zongbin',
    email: 'nzb329@163.com',
    avatar: './assets/images/avatar.jpg',
    // refresh_token: true,
  };
  createToken(user: User, expiresIn = 0) {
    const exp = user.refresh_token ? currentTimestamp() + expiresIn : undefined;

    return [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify(filterObject(Object.assign({ exp, user })))),
      base64.encode('ng-matero'),
    ].join('.');
  }
  login(username: string, password: string, rememberMe = false) {
    const func = <Token>() => {
      return filterObject({
        access_token: this.createToken(this.user, 3600),
        token_type: 'bearer',
        expires_in: this.user.refresh_token ? 3600 : undefined,
        refresh_token: this.user.refresh_token ? this.createToken(this.user, 86400) : undefined,
      });
    };
    return of(func());
    // return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    // return this.http.post<any>('/auth/logout', {});
    return of(true);
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
