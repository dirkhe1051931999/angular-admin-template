import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '@core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  @Input() nav2: string[] = [];
  public nav: string[] = [];
  nav$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.nav);
  constructor(private router: Router, private menu: MenuService) {}
  ngOnInit() {
    this.genBreadcrumb();
  }
  // 销毁监听
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  // 监听路由变化
  private sub = this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.genBreadcrumb();
    }
  });
  genBreadcrumb() {
    const routes = this.router.url.slice(1).split('/');
    this.nav = this.menu.getLevel(routes);
    this.nav.unshift('home');
    this.nav$.next(this.nav);
  }
  trackByNavlink(index: number, navlink: string): string {
    return navlink;
  }
}
