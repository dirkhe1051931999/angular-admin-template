import { APP_INITIALIZER } from '@angular/core';
import { TranslateLangService } from './bootstrap/translate-lang.service';
import { StartupService } from './bootstrap/startup.service';
import { SanctumService } from './bootstrap/sanctum.service';
import { MemoryStorageService } from '@shared';
export function SanctumServiceFactory(sanctumService: SanctumService) {
  return () => sanctumService.load();
}

export const appInitializerProviders = [
  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: SanctumServiceFactory,
  //   deps: [SanctumService],
  //   multi: true,
  // },
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
