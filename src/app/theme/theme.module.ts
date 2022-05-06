import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { HeaderComponent } from './header/header.component';
import { BrandingComponent } from './widgets/branding.component';
import { GithubButtonComponent } from './widgets/github.component';
import { NotificationComponent } from './widgets/notification.component';
import { TranslateComponent } from './widgets/translate.component';
import { UserComponent } from './widgets/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AccordionDirective } from './sidemenu/accordion.directive';
import { AccordionItemDirective } from './sidemenu/accordionItem.directive';
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
import { SidebarNoticeComponent } from './sidebar-notice/sidebar-notice.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { TopmenuPanelComponent } from './topmenu/topmenu-panel.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { UserPanelComponent } from './sidebar/user-panel.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    BrandingComponent,
    GithubButtonComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    TopmenuPanelComponent,
    CustomizerComponent,
    BreadcrumbComponent
  ],
  imports: [SharedModule, ThemeRoutingModule],
})
export class ThemeModule {}
