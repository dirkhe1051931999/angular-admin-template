import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { Level2_1Component } from './level1_1/level2_1/level2_1.component';
import { Level2_2Component } from './level1_1/level2_2/level2_2.component';
import { Level1_2Component } from './level1_2/level1_2.component';

const routes: Routes = [
  {
    path: 'level-1-1',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'ADMIN',
        redirectTo: '/dashboard',
      },
    },
    children: [
      {
        path: 'level-2-1',
        pathMatch: 'full',
        component: Level2_1Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN',
            redirectTo: '/dashboard',
          },
        },
      },
      {
        path: 'level-2-2',
        pathMatch: 'full',
        component: Level2_2Component,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN',
            redirectTo: '/dashboard',
          },
        },
      },
    ],
  },
  {
    path: 'level-1-2',
    component: Level1_2Component,
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
export class LevelRoutingModule {}
