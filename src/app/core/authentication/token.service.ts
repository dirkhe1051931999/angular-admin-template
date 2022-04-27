import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { share } from 'rxjs/operators';
import { LocalStorageService, MemoryStorageService } from '@shared';
import { Token } from './interface';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';
import { currentTimestamp, filterObject } from './helpers';
import { SettingsService } from '@core/bootstrap/settings.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnDestroy {
  private tokenName: string;

  private change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private refresh$ = new Subject<BaseToken | undefined>();
  private timer$?: Subscription;

  private _token?: BaseToken;

  constructor(
    private store: LocalStorageService,
    private factory: TokenFactory,
    settingsService: SettingsService
  ) {
    this.tokenName = settingsService.getAppName() + '-token';
  }
  // 获取token，token从localstorage中获取，没有就返回空
  private get token(): BaseToken | undefined {
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.tokenName));
      console.log(this._token)
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
  //
  refresh(): Observable<BaseToken | undefined> {
    this.buildRefresh();
    return this.refresh$.pipe(
      //  share：在多个订阅者间共享源 observable
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
  // 获取refreshToken
  getRefreshToken(): string | void {
    return this.token?.refresh_token;
  }
  ngOnDestroy(): void {
    this.clearRefresh();
  }
  private save(token?: Token): void {
    // remove和add封装起来
    this._token = undefined;
    if (!token) {
      // token remove
      this.store.remove(this.tokenName);
      // this.merory.remove(this.tokenName);
    } else {
      const value = Object.assign({ access_token: '', token_type: 'Bearer' }, token, {
        exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
      });
      this.store.set(this.tokenName, filterObject(value));
      // this.merory.set(this.tokenName, filterObject(value));
    }
    this.change$.next(this.token);
    this.buildRefresh();
  }
  private buildRefresh() {
    this.clearRefresh();

    if (this.token?.needRefresh()) {
      this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
        this.refresh$.next(this.token);
      });
    }
  }
  private clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }
}
