/**
 * 这个主要拦截http状态码200，但是body的code不成功错误
 */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@core/bootstrap/settings.service';
import { msg } from '@shared/utils/msg';
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService, private settingsService: SettingsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 不检查response body data
    if (this.settingsService.getNoCheckResponsePathList().includes(req.url))
      return next.handle(req);
    // 检查response body data
    return next.handle(req).pipe(mergeMap((event: HttpEvent<any>) => this.handleOkReq(req, event)));
  }

  private handleOkReq(req: HttpRequest<any>, res: HttpEvent<any>): Observable<any> {
    if (res instanceof HttpResponse) {
      const body: any = res.body;
      if (body && 'rspcode' in body) {
        const code = body.rspcode;
        // 响应失败的code，根据语言，映射message，提示错误
        if (!this.settingsService.getSuccessCode().includes(String(code))) {
          const DEFAULT_CODE = '00001';
          const lang = this.settingsService.getLanguage();
          const langList = ['en-US', 'zh-CN', 'zh-TW'];
          const index = langList.indexOf(lang) || 0;
          const message = !msg[code] ? msg[DEFAULT_CODE][index] : msg[code][index];
          this.toast.error(message);
          return throwError(() => [message, req.method, req.urlWithParams, req.body]);
        }
      }
    }
    return of(res);
  }
}
