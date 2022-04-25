import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './base-url-interceptor';
import { DefaultInterceptor } from './default-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { NoopInterceptor } from './noop-interceptor';
import { SettingsInterceptor } from './settings-interceptor';
import { TokenInterceptor } from './token-interceptor';

export * from './base-url-interceptor';
export * from './noop-interceptor';
export * from './settings-interceptor';
export * from './token-interceptor'; 
export * from './default-interceptor';
export * from './error-interceptor';
export * from './logging-interceptor';
/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  /* 不拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  /* base url 拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  /* http请求头，数据返回类型，url params参数 拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: SettingsInterceptor, multi: true },
  /* token拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  /* 返回数据拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  /* 错误拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  /* 日志拦截 */
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
