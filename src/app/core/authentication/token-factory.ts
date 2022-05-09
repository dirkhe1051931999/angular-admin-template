import { base64, capitalize } from '@shared';
import { Token } from './interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenFactory {
  create(attributes: Token): BaseToken | undefined {
    // token不存在
    if (!attributes.access_token) {
      return undefined;
    }
    // jwt token
    if (JwtToken.is(attributes.access_token)) {
      return new JwtToken(attributes);
    }
    // token存在
    return new SimpleToken(attributes);
  }
}
// 一个基本的token类
export abstract class BaseToken {
  constructor(protected attributes: Token) {}

  get access_token(): string {
    return this.attributes.access_token;
  }

  get token_type(): string {
    return this.attributes.token_type ?? 'bearer';
  }
  valid(): boolean {
    return this.hasAccessToken();
  }
  getBearerToken(): string {
    return this.access_token
      ? [capitalize(this.token_type), this.access_token].join(' ').trim()
      : '';
  }
  getNormalToken(): string {
    return this.access_token ?? '';
  }
  private hasAccessToken(): boolean {
    return !!this.access_token;
  }
}
// 简单的token
export class SimpleToken extends BaseToken {}
// jwt token
export class JwtToken extends SimpleToken {
  private _payload?: { exp?: number | void };
  static is(accessToken: string): boolean {
    try {
      const [_header] = accessToken.split('.');
      const header = JSON.parse(base64.decode(_header));

      return header.typ.toUpperCase().includes('JWT');
    } catch (e) {
      return false;
    }
  }
  get exp(): number | void {
    return this.payload?.exp;
  }
  private get payload(): { exp?: number | void } {
    if (!this.access_token) {
      return {};
    }

    if (this._payload) {
      return this._payload;
    }

    const [, payload] = this.access_token.split('.');
    const data = JSON.parse(base64.decode(payload));
    if (!data.exp) {
      data.exp = this.attributes.exp;
    }
    return (this._payload = data);
  }
}
