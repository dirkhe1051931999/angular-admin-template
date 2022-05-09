/**
 * 这个是个设置请求头header的auth信息
 */
import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from '@core/authentication';
import { BASE_URL } from './base-url-interceptor';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    @Optional() @Inject(BASE_URL) private baseUrl?: string
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler = () => {
      if (request.url.includes('/auth/logout')) {
        this.router.navigateByUrl('/auth/login');
      }
      if (this.router.url.includes('/auth/login')) {
        this.router.navigateByUrl('/');
      }
    };
    // 请求带上JWT的token，token存在且有效，不是http头的接口，
    if (this.tokenService.valid() && this.shouldAppendToken(request.url)) {
      return next
        .handle(
          request.clone({
            headers: request.headers
              .set('token', this.tokenService.getNormalToken()),
            // 当配置了xhr.withCredentials = true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*
            withCredentials: true,
          })
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.tokenService.clear();
              this.router.navigateByUrl('/auth/login');
            }
            return throwError(() => error);
          }),
          tap(() => handler())
        );
    }
    return next.handle(request).pipe(tap(() => handler()));
  }

  private shouldAppendToken(url: string) {
    return !new RegExp('^http(s)?://', 'i').test(url) || this.includeBaseUrl(url);
  }
  private includeBaseUrl(url: string) {
    if (!this.baseUrl) return false;
    const baseUrl = this.baseUrl.replace(/\/$/, '');
    return new RegExp(`^${baseUrl}`, 'i').test(url);
  }
}
