import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
const MODULES: any[] = [TranslateModule];
const COMPONENTS: any[] = [];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [];
const PIPE: any[] = [];
@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
})
export class SharedModule {}
