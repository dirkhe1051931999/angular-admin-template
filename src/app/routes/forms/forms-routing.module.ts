import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsElementsComponent } from './elements/elements.component';
import { FormsSelectComponent } from './select/select.component';
import { FormsDynamicComponent } from './dynamic/dynamic.component';
import { FormsDatetimeComponent } from './datetime/datetime.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'elements',
    component: FormsElementsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST2',
        redirectTo: '/dashboard',
      },
    },
  },
  {
    path: 'dynamic',
    component: FormsDynamicComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST2',
        redirectTo: '/dashboard',
      },
    },
  },
  {
    path: 'select',
    component: FormsSelectComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST2',
        redirectTo: '/dashboard',
      },
    },
  },
  {
    path: 'datetime',
    component: FormsDatetimeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST2',
        redirectTo: '/dashboard',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
