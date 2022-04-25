import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings, SettingsService } from '@core';
import { AppDirectionality } from '@shared';
import { OverlayContainer } from 'ngx-toastr';
import { filter, Subscription } from 'rxjs';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnDestroy {
  // props
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  // 销毁生命周期
  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
  // get
  get isOver(): boolean {
    return this.isMobileScreen;
  }
  // HostBinding：将 DOM 属性标记为主机绑定属性并提供配置元数据的装饰器。 Angular 在更改检测期间自动检查主机属性绑定，如果绑定更改，它会更新指令的主机元素
  @HostBinding('class.matero-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }
  @HostBinding('class.matero-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }
  // 变量
  options = this.settings.getOptions();
  private layoutChangesSubscription: Subscription;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  // 构造函数
  constructor(
    private settings: SettingsService,
    private breakpointObserver: BreakpointObserver, //用于检查 @media 查询的匹配状态的实用程序。
    private router: Router, //提供视图之间导航和 URL 操作功能的服务。
    private mediaMatcher: MediaMatcher, //用于调用 matchMedia 查询的实用程序。
    private overlay: OverlayContainer, //所有 toast 都将在其中呈现的容器。
    private element: ElementRef, // View 内原生元素的包装器。
    @Optional() @Inject(DOCUMENT) private document: Document, //指定依赖项的自定义提供程序的类构造函数的依赖项参数上的参数装饰器。
    @Inject(Directionality) public dir: AppDirectionality //
  ) {
    // 关于文字从左到右还是从右到左显示用的
    this.dir.value = this.options.dir!;
    this.document.body.dir = this.dir.value;
    // 监听媒体查询layout screen
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });

    // 检查浏览器是否支持`prefers-color-scheme`
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // 如果 `prefers-color-scheme` 是深色的，请将主题设置为深色。否则，将其设置为亮。
      this.options.theme = isSystemDark ? 'dark' : 'light';
    } else {
      // 如果浏览器不支持 `prefers-color-scheme`，请将默认设置为深色。
      this.options.theme = 'light';
    }

    // 使用选项初始化项目主题
    this.receiveOptions(this.options);
  }
  /* 方法 */
  // 设置option
  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }
  // 改变主题风格
  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.element.nativeElement.classList.add('theme-dark');
      this.overlay.getContainerElement().classList.add('theme-dark');
    } else {
      this.element.nativeElement.classList.remove('theme-dark');
      this.overlay.getContainerElement().classList.remove('theme-dark');
    }
  }
  // 改变文字方向
  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir!;
    this.document.body.dir = this.dir.value;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  sidenavCloseStart() {
    this.isContentWidthFixed = false;
  }
  
  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }
  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }
}
