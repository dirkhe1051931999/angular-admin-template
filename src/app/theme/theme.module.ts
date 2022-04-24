import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ThemeRoutingModule } from './theme-routing.module';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [SharedModule, ThemeRoutingModule],
})
export class ThemeModule {}
