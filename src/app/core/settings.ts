export interface AppSettings {
  navPos: 'side' | 'top';
  dir: 'ltr' | 'rtl';
  theme: 'light' | 'dark';
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
  noCheckResponsePath: string[];
  successCode: string[];
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'light',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
  noCheckResponsePath: ['/api/'],
  successCode: ['200', '00000'],
};
