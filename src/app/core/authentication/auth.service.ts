import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, merge, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { filterObject, isEmptyObject } from './helpers';
import { User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject：Subject 的一种变体，它需要一个初始值并在订阅时发出其当前值。
  private user$ = new BehaviorSubject<User>({});
  // merge,将多个 observables 转换成单个 observable 。
  private change$ = merge(this.tokenService.change()).pipe(
    switchMap(() => this.assignUser()),
    // share：在多个订阅者间共享源 observable
    share()
  );
  constructor(private loginService: LoginService, private tokenService: TokenService) {}
  init() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }
  change() {
    return this.change$;
  }
  check() {
    return this.tokenService.valid();
  }
  // 登录
  login(username: string, password: string, rememberMe = false) {
    return this.loginService.login(username, password, rememberMe).pipe(
      tap(token => {
        this.tokenService.set(token);
      }),
      map(() => this.check())
    );
  }
  // 退出登录
  logout() {
    return this.loginService.logout().pipe(
      tap(() => this.tokenService.clear()),
      map(() => !this.check())
    );
  }
  // 用户信息
  user() {
    return this.user$.pipe(
      // 在多个订阅者间共享源 observable
      share()
    );
  }
  // 获取menu信息
  menu() {
    // iif在订阅时检查布尔值，并在两个可观察源之一之间进行选择
    // token存在：请求menu，token不存在，返回空数组
    return iif(() => this.check(), this.loginService.menu(), of([]));
  }
  // 获取用户信息的渠道
  private assignUser() {
    // token不存在
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }
    // user不为空，返回user
    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }
    // 请求个人信息接口
    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }
}
