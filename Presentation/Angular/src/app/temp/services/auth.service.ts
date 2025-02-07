/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { BaseResult } from '../models/base-result';
import { LoginDtoResult } from '../models/login-dto-result';
import { UserDataInputDto } from '../models/user-data-input-dto';
import { UserDtoListResult } from '../models/user-dto-list-result';
import { UserDtoResult } from '../models/user-dto-result';
import { UserSecurityInputDto } from '../models/user-security-input-dto';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiAuthPost()` */
  static readonly ApiAuthPostPath = '/api/Auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Plain$Response(
    params?: {
      username?: string;
      password?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LoginDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthPostPath, 'post');
    if (params) {
      rb.query('username', params.username, {"style":"form"});
      rb.query('password', params.password, {"style":"form"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Plain(
    params?: {
      username?: string;
      password?: string;
    },
    context?: HttpContext
  ): Observable<LoginDtoResult> {
    return this.apiAuthPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>): LoginDtoResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Json$Response(
    params?: {
      username?: string;
      password?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LoginDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthPostPath, 'post');
    if (params) {
      rb.query('username', params.username, {"style":"form"});
      rb.query('password', params.password, {"style":"form"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Json(
    params?: {
      username?: string;
      password?: string;
    },
    context?: HttpContext
  ): Observable<LoginDtoResult> {
    return this.apiAuthPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>): LoginDtoResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserGet()` */
  static readonly ApiAuthUserGetPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<UserDtoListResult> {
    return this.apiAuthUserGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoListResult>): UserDtoListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<UserDtoListResult> {
    return this.apiAuthUserGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoListResult>): UserDtoListResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserPut()` */
  static readonly ApiAuthUserPutPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Plain$Response(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Plain(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Json$Response(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Json(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserPost()` */
  static readonly ApiAuthUserPostPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Plain$Response(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Plain(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Json$Response(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Json(
    params: {
      body: UserDataInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserUsernameGet()` */
  static readonly ApiAuthUserUsernameGetPath = '/api/Auth/User/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Plain$Response(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameGetPath, 'get');
    if (params) {
      rb.path('username', params.username, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserUsernameGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Plain(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<UserDtoResult> {
    return this.apiAuthUserUsernameGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoResult>): UserDtoResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Json$Response(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<UserDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameGetPath, 'get');
    if (params) {
      rb.path('username', params.username, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserUsernameGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Json(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<UserDtoResult> {
    return this.apiAuthUserUsernameGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoResult>): UserDtoResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserUsernameDelete()` */
  static readonly ApiAuthUserUsernameDeletePath = '/api/Auth/User/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Plain$Response(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameDeletePath, 'delete');
    if (params) {
      rb.path('username', params.username, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserUsernameDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Plain(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserUsernameDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Json$Response(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameDeletePath, 'delete');
    if (params) {
      rb.path('username', params.username, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserUsernameDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Json(
    params: {
      username: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserUsernameDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserSecurityPut()` */
  static readonly ApiAuthUserSecurityPutPath = '/api/Auth/User/Security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserSecurityPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Plain$Response(
    params: {
      body: UserSecurityInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserSecurityPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserSecurityPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Plain(
    params: {
      body: UserSecurityInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserSecurityPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserSecurityPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Json$Response(
    params: {
      body: UserSecurityInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserSecurityPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserSecurityPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Json(
    params: {
      body: UserSecurityInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserSecurityPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiAuthUserPasswordPut()` */
  static readonly ApiAuthUserPasswordPutPath = '/api/Auth/User/Password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPasswordPut$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Plain$Response(
    params?: {
      password?: string;
      newPassword?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPasswordPutPath, 'put');
    if (params) {
      rb.query('password', params.password, {"style":"form"});
      rb.query('newPassword', params.newPassword, {"style":"form"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPasswordPut$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Plain(
    params?: {
      password?: string;
      newPassword?: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPasswordPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPasswordPut$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Json$Response(
    params?: {
      password?: string;
      newPassword?: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPasswordPutPath, 'put');
    if (params) {
      rb.query('password', params.password, {"style":"form"});
      rb.query('newPassword', params.newPassword, {"style":"form"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BaseResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthUserPasswordPut$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Json(
    params?: {
      password?: string;
      newPassword?: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiAuthUserPasswordPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiAuthSessionGet()` */
  static readonly ApiAuthSessionGetPath = '/api/Auth/Session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSessionGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LoginDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSessionGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthSessionGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<LoginDtoResult> {
    return this.apiAuthSessionGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>): LoginDtoResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSessionGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<LoginDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSessionGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LoginDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthSessionGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<LoginDtoResult> {
    return this.apiAuthSessionGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>): LoginDtoResult => r.body)
    );
  }

}
