import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { CookieService } from '@shared';
import { Token } from './interface';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';
import { currentTimestamp, filterObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private _token?: BaseToken;
  constructor(private store: CookieService, private factory: TokenFactory) {}
  // 获取token，token从localstorage中获取，没有就返回空
  private get token(): BaseToken | undefined {
    if (!this._token) {
      this._token = this.factory.create(this.store.getToken());
    }
    return this._token;
  }
  // 观察token变化
  change(): Observable<BaseToken | undefined> {
    return this.change$.pipe(
      // share：在多个订阅者间共享源 observable
      share()
    );
  }
  // 设置token
  set(token?: Token): TokenService {
    this.save(token);
    return this;
  }
  // 清除token
  clear(): void {
    this.save();
  }
  // token是否有效
  valid(): boolean {
    return this.token?.valid() ?? false;
  }
  // 获取BearerToke
  getBearerToken(): string {
    return this.token?.getBearerToken() ?? '';
  }
  getNormalToken(): string {
    return this.token?.getNormalToken() ?? '';
  }
  private save(token?: Token): void {
    // remove和add封装起来
    this._token = undefined;
    if (!token) {
      // token remove
      this.store.removeToken();
    } else {
      const value = Object.assign({ access_token: '', token_type: 'Normal' }, token, {
        exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
      });
      this.store.setToken(filterObject(value));
    }
    this.change$.next(this.token);
  }
}
