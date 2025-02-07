import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

@Injectable()
export class BaseService {
  private _rootUrl: string = '';

  constructor(protected config: ApiConfiguration, protected http: HttpClient) {}

  get rootUrl(): string {
    return this._rootUrl || this.config.rootUrl || '';
  }

  set rootUrl(rootUrl: string) {
    this._rootUrl = rootUrl;
  }
}
