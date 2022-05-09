/**
 * 这个主要存储请求日志
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { MessageService } from '@shared';
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private messenger: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(event => (ok = event instanceof HttpResponse ? 'succeeded' : 'failed')),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        this.messenger.add(msg);
      })
    );
  }
}
