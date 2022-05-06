/**
 * 这个主要拦截url，根据条件是否设置baseurl
 *  base url 从 environments/environment.prod.ts || environments/environment.ts 读取
 */
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken<string>('');
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private requestAssetsData = (url: string) =>
    url.substring(0, 8) === '/assets/' || url.substring(0, 9) === './assets/';
  constructor(@Optional() @Inject(BASE_URL) private baseUrl?: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.requestAssetsData(request.url)) {
      // 如果请求的是静态资源数据，就直接请求
      return next.handle(request);
    } else {
      // 如果请求不是静态资源
      if (new RegExp('^http(s)?://', 'i').test(request.url)) {
        // 如果带了http(s)请求头，直接请求接口
        return next.handle(request);
      } else {
        // 如果没带请求头，那么就拼一下地址请求
        return next.handle(request.clone({ url: this.prependBaseUrl(request.url) }));
      }
    }
  }

  private prependBaseUrl(url: string) {
    return [this.baseUrl?.replace(/\/$/g, ''), url.replace(/^\.?\//, '')]
      .filter(val => val)
      .join('/');
  }
}
