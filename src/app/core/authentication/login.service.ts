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
      },
      {
        route: 'permissions',
        name: 'permissions',
        type: 'sub',
        icon: 'lock',
        label: {
          color: 'primary-500',
          value: 'permission',
        },
        children: [
          {
            route: 'role-switching',
            name: 'role-switching',
            type: 'link',
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
      {
        route: 'forms',
        name: 'forms',
        type: 'sub',
        icon: 'description',
        label: {
          color: 'primary-500',
          value: 'form',
        },
        children: [
          {
            route: 'elements',
            name: 'form-elements',
            type: 'link',
          },
          {
            route: 'dynamic',
            name: 'dynamic-form',
            type: 'link',
          },
          {
            route: 'select',
            name: 'select',
            type: 'link',
          },
          {
            route: 'datetime',
            name: 'datetime',
            type: 'link',
          },
        ],
        permissions: {
          only: 'GUEST2',
        },
      },
      {
        route: 'tables',
        name: 'tables',
        type: 'sub',
        icon: 'format_line_spacing',
        label: {
          color: 'primary-500',
          value: 'table',
        },
        children: [
          {
            route: 'kitchen-sink',
            name: 'kitchen-sink',
            type: 'link',
          },
          {
            route: 'remote-data',
            name: 'remote-data',
            type: 'link',
          },
        ],
        permissions: {
          except: 'GUEST',
        },
      },
      {
        route: 'menu-level',
        name: 'menu-level',
        type: 'sub',
        icon: 'subject',
        children: [
          {
            route: 'level-1-1',
            name: 'level-1-1',
            type: 'sub',
            children: [
              {
                route: 'level-2-1',
                name: 'level-2-1',
                type: 'link',
              },
              {
                route: 'level-2-2',
                name: 'level-2-2',
                type: 'link',
              },
            ],
          },
          {
            route: 'level-1-2',
            name: 'level-1-2',
            type: 'link',
          },
        ],
        permissions: {
          only: 'ADMIN',
        },
      },
      {
        route: 'https://github.com/dirkhe1051931999/angular-admin-template',
        name: 'extensions',
        type: 'extTabLink',
        icon: 'link',
        permissions: {
          only: 'ADMIN',
        },
      },
    ]).pipe(res => res);
    // return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
