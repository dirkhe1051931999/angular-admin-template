import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsRoleSwitchingComponent } from './role-switching/role-switching.component';
import { PermissionsTestComponent } from './test/test.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: 'role-switching', component: PermissionsRoleSwitchingComponent },
  {
    path: 'test',
    component: PermissionsTestComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/dashboard',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsRoutingModule {}
