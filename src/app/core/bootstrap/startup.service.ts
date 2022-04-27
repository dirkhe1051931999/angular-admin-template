import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Menu, MenuService } from './menu.service';
import { AuthService, User } from '@core/authentication';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissonsService: NgxPermissionsService,
    private rolesService: NgxRolesService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve, reject) => {
      resolve();
      this.authService
        .change()
        .pipe(
          tap(user => {
            // 设置权限，注册npxpermission
            this.setPermissions(user);
          }),
          switchMap(() => {
            // 获取menu，menu json里面有设置角色字段，不同角色可以访问不同页面，有着不同的权限
            return this.authService.menu();
          }),
          tap(menu => {
            // 设置menu
            this.setMenu(menu);
          })
        )
        .subscribe({ next: () => resolve(), complete: () => resolve(), error: () => resolve() });
    });
  }
  private setMenu(menu: Menu[]) {
    // 添加命名空间，为了翻译
    this.menuService.addNamespace(menu, 'menu');
    // 设置menu
    this.menuService.set(menu);
  }
  private setPermissions(user: User) {
    // 在实际应用中，应该从用户信息中获取权限和角色。
    // ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    // MANAGER: ['canAdd', 'canEdit', 'canRead'],
    // GUEST: ['canRead'],
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    // 定义多个权限
    this.permissonsService.loadPermissions(permissions);
    // 删除所有角色
    this.rolesService.flushRoles();
    // 定义多个角色:ADMIN,GUEST,MANAGER
    this.rolesService.addRoles({ ADMIN: permissions });
    // 可以同时添加具有角色的权限.
    // this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
  }
}
