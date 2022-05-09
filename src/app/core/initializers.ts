import { APP_INITIALIZER } from '@angular/core';
import { TranslateLangService } from './boot/translate-lang.service';
import { StartupService } from './boot/startup.service';

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: (translateLangService: TranslateLangService) => () => translateLangService.load(),
    deps: [TranslateLangService],
    multi: true, //如果为 true，则注入器返回实例数组
  },
  {
    provide: APP_INITIALIZER,
    useFactory: (startupService: StartupService) => () => startupService.load(),
    deps: [StartupService],
    multi: true,
  },
];
