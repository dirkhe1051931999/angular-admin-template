import { Component } from '@angular/core';
import { SettingsService } from '@core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="matero-branding">
      <img src="./assets/images/logo.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name fs-12">{{ title }}</span>
    </div>
  `,
})
export class BrandingComponent {
  public title: string;
  constructor(settingsService: SettingsService) {
    this.title = settingsService.getAppName();
  }
}
