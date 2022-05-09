/* 登录接口api */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from './interface';
import { Menu } from '@core';
import { of } from 'rxjs';
import { base64, currentTimestamp, filterObject } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}
  private user: User = {};
  // 创建一个token
  _createToken(user: User, expiresIn = 0) {
    const exp = user.refresh_token ? currentTimestamp() + expiresIn : undefined;
    return [
      base64.encode(JSON.stringify({ typ: 'JWT', alg: 'HS256' })),
      base64.encode(JSON.stringify(filterObject(Object.assign({ exp, user })))),
      base64.encode('angular-admin-template'),
    ].join('.');
  }
  // 登录
  login(username: string, password: string, rememberMe = false) {
    return of<Token>(
      // 这个是普通token
      filterObject({
        //   access_token: this._createToken(this.user, 3600),
        //   token_type: 'bearer',
        access_token: 'tokentokentoken',
        token_type: 'Normal',
      }) as any
    );
    // return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }
  // 退出登录
  logout() {
    return of<Boolean>(true);
    // return this.http.post<any>('/auth/logout', {});
  }
  // 获取个人信息
  me() {
    return of<User>({
      id: 1,
      name: 'Hejian',
      email: 'h96412j@gmail.com',
      avatar: './assets/images/avatar.png',
    });
    // return this.http.get<User>('/me');
  }
  // 获取按钮信息
  menu() {
    // src\assets\data\menu.json
    return of<Menu[]>([
      {
        route: 'dashboard',
        name: 'dashboard',
        type: 'link',
        icon: 'dashboard',
        badge: {
          color: 'negative-500',
          value: '5',
        },
      },
      {
        route: 'permissions',
        name: 'permissions',
        type: 'sub',
        icon: 'lock',
        label: {
          color: 'primary-500',
          value: 'new',
        },
        children: [
          {
            route: 'role-switching',
            name: 'role-switching',
            type: 'link',
          },
          {
            route: 'route-guard',
            name: 'route-guard',
            type: 'link',
            permissions: {
              except: 'GUEST',
            },
          },
          {
            route: 'test',
            name: 'test',
            type: 'link',
            permissions: {
              only: 'ADMIN',
            },
          },
        ],
      },
    ]).pipe(res => res);
    // return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
