import { Injectable } from '@angular/core';
import { deepClone, isJsonObjEqual } from '@shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export interface MenuTag {
  color: string; // background color
  value: string;
}

export interface MenuPermissions {
  only?: string | string[];
  except?: string | string[];
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}

export interface Menu {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  /** 获取所有菜单数据。 */
  getAll(): Observable<Menu[]> {
    return this.menu$.asObservable();
  }
  /** 观察菜单数据的变化。 */
  change(): Observable<Menu[]> {
    return this.menu$.pipe(share());
  }
  /** 初始化菜单数据。 */
  set(menu: Menu[]): Observable<Menu[]> {
    this.menu$.next(menu);
    // asObservable:这样做的目的是防止从 API 中泄露 Subject 的“观察者端”。基本上是为了防止当您不希望人们能够“下一个”进入结果可观察对象时出现泄漏的抽象
    return this.menu$.asObservable();
  }
  /** 向菜单数据添加一项。 */
  add(menu: Menu) {
    const tmpMenu = this.menu$.value;
    tmpMenu.push(menu);
    this.menu$.next(tmpMenu);
  }
  /** 重置菜单数据。 */
  reset() {
    this.menu$.next([]);
  }
  /** 删除空值并重建路由。 */
  buildRoute(routeArr: string[]): string {
    let route = '';
    routeArr.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
  /** 根据当前路由获取菜单项名称。 */
  getItemName(routeArr: string[]): string {
    return this.getLevel(routeArr)[routeArr.length - 1];
  }
  // 是否为叶子菜单
  private isLeafItem(item: MenuChildrenItem): boolean {
    const cond0 = item.route === undefined;
    const cond1 = item.children === undefined;
    const cond2 = !cond1 && item.children?.length === 0;
    return cond0 || cond1 || cond2;
  }
  // routeArr 是否等于 realRouteArr（删除空路由元素后）
  private isRouteEqual(routeArr: Array<string>, realRouteArr: Array<string>): boolean {
    realRouteArr = deepClone(realRouteArr);
    realRouteArr = realRouteArr.filter(r => r !== '');
    return isJsonObjEqual(routeArr, realRouteArr);
  }
  /** 获取menu等级 */
  getLevel(routeArr: string[]): string[] {
    let tmpArr: any[] = [];
    this.menu$.value.forEach(item => {
      // Breadth-first traverse
      let unhandledLayer = [{ item, parentNamePathList: [], realRouteArr: [] }];
      while (unhandledLayer.length > 0) {
        let nextUnhandledLayer: any[] = [];
        for (const ele of unhandledLayer) {
          const eachItem = ele.item;
          const currentNamePathList = deepClone(ele.parentNamePathList).concat(eachItem.name);
          const currentRealRouteArr = deepClone(ele.realRouteArr).concat(eachItem.route);
          // Compare the full Array for expandable
          if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
            tmpArr = currentNamePathList;
            break;
          }
          if (!this.isLeafItem(eachItem)) {
            const wrappedChildren = eachItem.children?.map(child => ({
              item: child,
              parentNamePathList: currentNamePathList,
              realRouteArr: currentRealRouteArr,
            }));
            nextUnhandledLayer = nextUnhandledLayer.concat(wrappedChildren);
          }
        }
        unhandledLayer = nextUnhandledLayer;
      }
    });
    return tmpArr;
  }
  /** 为翻译添加命名空间. */
  addNamespace(menu: Menu[] | MenuChildrenItem[], namespace: string) {
    menu.forEach(menuItem => {
      menuItem.name = `${namespace}.${menuItem.name}`;
      if (menuItem.children && menuItem.children.length > 0) {
        this.addNamespace(menuItem.children, menuItem.name);
      }
    });
  }
}
