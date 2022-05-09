import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, isObservable } from 'rxjs';

@Pipe({ name: 'toObservable' })
export class ToObservablePipe implements PipeTransform {
  // 由管道实现以执行转换的接口。 Angular 调用 transform 方法，绑定的值作为第一个参数，任何参数作为列表形式的第二个参数。
  transform(value: Observable<any> | unknown): Observable<any> {
    return isObservable(value) ? value : of(value);
  }
}
