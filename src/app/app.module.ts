import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { ThemeModule } from '@theme/theme.module';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { BASE_URL, appInitializerProviders, httpInterceptorProviders } from '@core';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '@env/environment';
// 获取翻译的json
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // 业务核心
    CoreModule,
    // layout header 一些东西
    ThemeModule,
    // 路由文件
    RoutesModule,
    // 公用方法
    SharedModule,
    // toast
    ToastrModule.forRoot(),
    /* i18n核心代码 */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
  ],
  providers: [
    // base url
    { provide: BASE_URL, useValue: environment.baseUrl },
    /* i18n核心代码 */
    appInitializerProviders,
    /* http请求拦截 */
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
