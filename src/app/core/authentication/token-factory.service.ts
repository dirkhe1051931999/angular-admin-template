import { Injectable } from '@angular/core';
import { Token } from './interface';
import { SimpleToken, JwtToken, BaseToken } from './token';

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
