import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { PreloaderService } from '@core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {
  // 这个是加载app之前的操作，比如做一个loading动画，再比如做一个骨架屏
  constructor() // private preloader: PreloaderService
  {}
  ngOnInit() {}

  ngAfterViewInit() {
    // this.preloader.hide();
  }
}
