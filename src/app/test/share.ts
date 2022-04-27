// RxJS v6+
import { timer } from 'rxjs';
import { tap, mapTo, share, map } from 'rxjs/operators';

// 1秒后发出值
const source = timer(1000);
// 输出副作用，然后发出结果
// const example = source.pipe(
//   tap(() => console.log('***SIDE EFFECT***')),
//   map(() => '***RESULT***')
// );

/*
  ***不共享的话，副作用会执行两次***
  输出: 
  "***SIDE EFFECT***"
  "***RESULT***"
  "***SIDE EFFECT***"
  "***RESULT***"
*/

// 在多个订阅者间共享 observable
const example = source.pipe(
  map(() => '***RESULT***'),
  share()
);
/*
   ***共享的话，副作用只执行一次***
  输出:
  "***SIDE EFFECT***"
  "***RESULT***"
  "***RESULT***"
*/
const subscribeThree = example.subscribe(val => console.log(val));
// const subscribeFour = example.subscribe(val => console.log(val));
