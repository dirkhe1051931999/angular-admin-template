import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  // DomSanitizer 通过清理值以在不同的 DOM 上下文中安全使用来帮助防止跨站点脚本安全错误 (XSS)。
  // 例如，当在 <a [href]="someValue"> 超链接中绑定 URL 时， someValue 将被清理，以便攻击者无法注入例如一个 javascript: 将在网站上执行代码的 URL。
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
