import { Injectable } from '@angular/core';
import { AppSettings, SettingsService } from '@core';
import Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root',
})
export class CookieService {
  infiniteTime = new Date(new Date().getTime() + 999999999 * 60 * 1000);
  config = {
    path: '/',
    expires: this.infiniteTime,
  };
  tokenKey: string;
  constructor(settingsService: SettingsService) {
    this.tokenKey = settingsService.getAppName() + '-' + 'token';
  }
  // token
  getToken = () => JSON.parse(Cookies.get(this.tokenKey) || '{}');
  setToken = (token: any) => Cookies.set(this.tokenKey, JSON.stringify(token), this.config);
  removeToken = () => Cookies.remove(this.tokenKey);
}

export class LocalStorageService {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  set(key: string, value: any): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export class MemoryStorageService {
  private store: { [k: string]: string } = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
