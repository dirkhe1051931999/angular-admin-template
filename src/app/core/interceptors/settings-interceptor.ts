import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from '@core';
// export interface IHttpClientServiceOptions {
//   headers?:
//     | HttpHeaders
//     | {
//         [header: string]: string | string[];
//       };
//   observe?: 'response' | 'events' | 'body';
//   params?:
//     | HttpParams
//     | {
//         [param: string]: string | string[];
//       };
//   reportProgress?: boolean;
//   responseType?: 'json' | 'arraybuffer' | 'blob' | 'text' | 'arraybuffer';
//   withCredentials?: boolean;
//   ignoreCheck?: boolean;
//   ignoreErrorCheck?: boolean;
//   timeStamp?: boolean;
// }
@Injectable()
export class SettingsInterceptor implements HttpInterceptor {
  constructor(private settings: SettingsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        headers: request.headers.append('Accept-Language', this.settings.getLanguage()),
      })
    );
  }
}
