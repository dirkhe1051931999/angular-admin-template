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
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService, private settingsService: SettingsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 不检查response body data
    if (this.settingsService.getNoCheckResponsePathList().includes(req.url))
      return next.handle(req);
    // 检查response body data
    return next.handle(req).pipe(mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    if (event instanceof HttpResponse) {
      // 获取code，映射错误
      const body: any = event.body;
      if (
        body &&
        'code' in body &&
        !this.settingsService.getSuccessCode().includes(String(body.code))
      ) {
        if (body.msg) {
          this.toast.error(body.msg);
        }
        return throwError(() => []);
      }
    }
    // Pass down event if everything is OK
    return of(event);
  }
}
