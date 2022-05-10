import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '@core';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-permissions-role-switching',
  templateUrl: './role-switching.component.html',
  styleUrls: ['./role-switching.component.scss'],
})
export class PermissionsRoleSwitchingComponent implements OnInit, OnDestroy {
  toggleChecked = false;
  currentRole!: string;
  currentPermissions!: string[];
  permissionsOfRole: any;
  private readonly _destroy$ = new Subject<void>();
  constructor(
    private rolesService: NgxRolesService,
    private permissionsSrv: NgxPermissionsService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.permissionsOfRole = roleService.permissionsOfRole;
  }
  ngOnInit() {
    this.currentRole = Object.keys(this.rolesService.getRoles())[0];
    this.currentPermissions = Object.keys(this.permissionsSrv.getPermissions());
    this.rolesService.roles$.pipe(takeUntil(this._destroy$)).subscribe(roles => {
      // console.log(roles);
    });
    this.permissionsSrv.permissions$.pipe(takeUntil(this._destroy$)).subscribe(permissions => {
      // console.log(permissions);
    });
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  onPermissionChange() {
    this.currentPermissions = this.permissionsOfRole[this.currentRole];
    this.rolesService.flushRolesAndPermissions();
    this.rolesService.addRoleWithPermissions(this.currentRole, this.currentPermissions);
    if (this.toggleChecked) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
