import { base64, capitalize, currentTimestamp, timeLeft } from './helpers';
import { Token } from './interface';

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

export class SimpleToken extends BaseToken {}

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
