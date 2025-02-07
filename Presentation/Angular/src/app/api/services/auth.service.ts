import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  ApiConfiguration,
  StrictHttpResponse,
  RequestBuilder,
} from 'src/app/api';
import {
  BaseResult,
  LoginDto,
  LoginDtoResult,
  UserDto,
  UserDtoListResult,
  UserDtoResult
} from '../models';
import { BaseService } from '../base-service';
import { UserDataInputDto, UserSecurityInputDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private authLocalStorageToken = `${environment.version}-${environment.USER_KEY}`;

  user: Observable<LoginDto>;
  isLoading: Observable<boolean>;
  userSubject: BehaviorSubject<LoginDto>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUser(): LoginDto {
    return this.userSubject.value;
  }

  set currentUser(user: LoginDto) {
    this.userSubject.next(user);
  }

  constructor(
    http: HttpClient,
    config: ApiConfiguration,
    private router: Router
  ) {
    super(config, http);
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.userSubject = new BehaviorSubject<LoginDto>(
      this.getAuthFromLocalStorage()
    );
    this.user = this.userSubject.asObservable();
    this.isLoading = this.isLoadingSubject.asObservable();
  }

  refreshUserData() {
    this.apiAuthSessionGet$Json().subscribe({
      next: ({ data }) => {
        this.currentUser = data;
        this.setAuthFromLocalStorage(this.currentUser);
        window.location.reload();
      }
    })
  }

  login(username: string, password: string): Observable<LoginDtoResult> {
    this.isLoadingSubject.next(true);

    return this.apiAuthPost$Json({ username, password }).pipe(
      map((result) => {
        const { data } = result;
        this.setAuthFromLocalStorage(data);
        this.isLoadingSubject.next(false);
        this.userSubject.next(data);
        return result;
      }),
      catchError((err) => {
        throw err;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.clear();
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
  }

  private setAuthFromLocalStorage(auth: LoginDto): boolean {
    if (!auth || !auth?.token) return false;

    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
    return true;
  }

  private getAuthFromLocalStorage(): LoginDto | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      return undefined;
    }
  }

  /**
    * Path part for operation apiAuthPost
    */
  static readonly ApiAuthPostPath = '/api/Auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Plain$Response(params?: {
    username?: string;
    password?: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<LoginDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthPostPath, 'post');
    if (params) {
      rb.query('username', params.username, { "style": "form" });
      rb.query('password', params.password, { "style": "form" });
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthPost$Plain(params?: {
    username?: string;
    password?: string;
  },
    context?: HttpContext

  ): Observable<LoginDtoResult> {

    return this.apiAuthPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>) => r.body as LoginDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthPost$Json$Response(params?: {
    username?: string;
    password?: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<LoginDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthPostPath, 'post');
    if (params) {
      rb.query('username', params.username, { "style": "form" });
      rb.query('password', params.password, { "style": "form" });
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthPost$Json(params?: {
    username?: string;
    password?: string;
  },
    context?: HttpContext

  ): Observable<LoginDtoResult> {

    return this.apiAuthPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginDtoResult>) => r.body as LoginDtoResult)
    );
  }

  /**
   * Path part for operation apiAuthUserGet
   */
  static readonly ApiAuthUserGetPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Plain$Response(params?: {
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserGet$Plain(params?: {
  },
    context?: HttpContext

  ): Observable<UserDtoListResult> {

    return this.apiAuthUserGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoListResult>) => r.body as UserDtoListResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserGet$Json$Response(params?: {
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserGet$Json(params?: {
  },
    context?: HttpContext

  ): Observable<UserDtoListResult> {

    return this.apiAuthUserGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoListResult>) => r.body as UserDtoListResult)
    );
  }

  /**
   * Path part for operation apiAuthUserPut
   */
  static readonly ApiAuthUserPutPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Plain$Response(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPut$Plain(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPut$Json$Response(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPut$Json(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiAuthUserPost
   */
  static readonly ApiAuthUserPostPath = '/api/Auth/User';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Plain$Response(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPost$Plain(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserPost$Json$Response(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPost$Json(params: {
    body: UserDataInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiAuthUserUsernameGet
   */
  static readonly ApiAuthUserUsernameGetPath = '/api/Auth/User/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Plain$Response(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameGetPath, 'get');
    if (params) {
      rb.path('username', params.username, { "style": "simple" });
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserUsernameGet$Plain(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<UserDtoResult> {

    return this.apiAuthUserUsernameGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoResult>) => r.body as UserDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameGet$Json$Response(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameGetPath, 'get');
    if (params) {
      rb.path('username', params.username, { "style": "simple" });
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserUsernameGet$Json(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<UserDtoResult> {

    return this.apiAuthUserUsernameGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDtoResult>) => r.body as UserDtoResult)
    );
  }

  /**
   * Path part for operation apiAuthUserUsernameDelete
   */
  static readonly ApiAuthUserUsernameDeletePath = '/api/Auth/User/{username}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Plain$Response(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameDeletePath, 'delete');
    if (params) {
      rb.path('username', params.username, { "style": "simple" });
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserUsernameDelete$Plain(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserUsernameDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserUsernameDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserUsernameDelete$Json$Response(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserUsernameDeletePath, 'delete');
    if (params) {
      rb.path('username', params.username, { "style": "simple" });
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserUsernameDelete$Json(params: {
    username: string;
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserUsernameDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiAuthUserSecurityPut
   */
  static readonly ApiAuthUserSecurityPutPath = '/api/Auth/User/Security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserSecurityPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Plain$Response(params: {
    body: UserSecurityInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserSecurityPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserSecurityPut$Plain(params: {
    body: UserSecurityInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserSecurityPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserSecurityPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAuthUserSecurityPut$Json$Response(params: {
    body: UserSecurityInputDto
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserSecurityPutPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserSecurityPut$Json(params: {
    body: UserSecurityInputDto
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserSecurityPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiAuthUserPasswordPut
   */
  static readonly ApiAuthUserPasswordPutPath = '/api/Auth/User/Password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPasswordPut$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Plain$Response(params?: {
    password?: string;
    newPassword?: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPasswordPutPath, 'put');
    if (params) {
      rb.query('password', params.password, { "style": "form" });
      rb.query('newPassword', params.newPassword, { "style": "form" });
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPasswordPut$Plain(params?: {
    password?: string;
    newPassword?: string;
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPasswordPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthUserPasswordPut$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthUserPasswordPut$Json$Response(params?: {
    password?: string;
    newPassword?: string;
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthUserPasswordPutPath, 'put');
    if (params) {
      rb.query('password', params.password, { "style": "form" });
      rb.query('newPassword', params.newPassword, { "style": "form" });
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
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
  apiAuthUserPasswordPut$Json(params?: {
    password?: string;
    newPassword?: string;
  },
    context?: HttpContext

  ): Observable<BaseResult> {

    return this.apiAuthUserPasswordPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiAuthSessionGet
   */
  static readonly ApiAuthSessionGetPath = '/api/Auth/Session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSessionGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Plain$Response(params?: {
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSessionGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiAuthSessionGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Plain(params?: {
  },
    context?: HttpContext

  ): Observable<UserDto> {

    return this.apiAuthSessionGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>) => r.body as UserDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAuthSessionGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAuthSessionGet$Json$Response(params?: {
  },
    context?: HttpContext

  ): Observable<StrictHttpResponse<UserDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.ApiAuthSessionGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserDto>;
      })
    );
  }

  /**
  * This method provides access only to the response body.
  * To access the full response (for headers, for example), `apiAuthSessionGet$Json$Response()` instead.
  *
  * This method doesn't expect any request body.
  */
  apiAuthSessionGet$Json(params?: {
  },
    context?: HttpContext

  ): Observable<LoginDtoResult> {

    return this.apiAuthSessionGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as LoginDtoResult)
    );
  }
}
