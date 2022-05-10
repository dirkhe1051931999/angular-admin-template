import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsTestComponent } from './test/test.component';
import { PermissionsRoleSwitchingComponent } from './role-switching/role-switching.component';

const COMPONENTS: any[] = [
  PermissionsTestComponent,
  PermissionsRoleSwitchingComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, PermissionsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class PermissionsModule {}
