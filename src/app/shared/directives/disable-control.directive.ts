import { NgControl } from '@angular/forms';
import { Directive, Input, SkipSelf, Optional } from '@angular/core';

@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control?.[action]();
  }
  // 所有基于 FormControl 的指令扩展的基类。它将 FormControl 对象绑定到 DOM 元素。
  constructor(@Optional() @SkipSelf() private ngControl: NgControl) {}
}
