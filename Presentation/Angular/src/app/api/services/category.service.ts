/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BaseResult } from '../models/base-result';
import { CategoryDtoListResult } from '../models/category-dto-list-result';
import { CategoryDtoResult } from '../models/category-dto-result';
import { CategoryInputDto } from '../models/category-input-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiCategoryGet
   */
  static readonly ApiCategoryGetPath = '/api/Category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCategoryGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<CategoryDtoListResult> {

    return this.apiCategoryGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDtoListResult>) => r.body as CategoryDtoListResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCategoryGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryGet$Json(params?: {
  },
  context?: HttpContext

): Observable<CategoryDtoListResult> {

    return this.apiCategoryGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDtoListResult>) => r.body as CategoryDtoListResult)
    );
  }

  /**
   * Path part for operation apiCategoryPost
   */
  static readonly ApiCategoryPostPath = '/api/Category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryPost$Plain$Response(params: {
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCategoryPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryPost$Plain(params: {
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryPost$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryPost$Json$Response(params: {
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiCategoryPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryPost$Json(params: {
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryPost$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiCategoryIdGet
   */
  static readonly ApiCategoryIdGetPath = '/api/Category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdGet$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCategoryIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdGet$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<CategoryDtoResult> {

    return this.apiCategoryIdGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDtoResult>) => r.body as CategoryDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdGet$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CategoryDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiCategoryIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdGet$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<CategoryDtoResult> {

    return this.apiCategoryIdGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<CategoryDtoResult>) => r.body as CategoryDtoResult)
    );
  }

  /**
   * Path part for operation apiCategoryIdPut
   */
  static readonly ApiCategoryIdPutPath = '/api/Category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryIdPut$Plain$Response(params: {
    id: string;
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiCategoryIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryIdPut$Plain(params: {
    id: string;
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryIdPut$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryIdPut$Json$Response(params: {
    id: string;
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiCategoryIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiCategoryIdPut$Json(params: {
    id: string;
    body: CategoryInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryIdPut$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiCategoryIdDelete
   */
  static readonly ApiCategoryIdDeletePath = '/api/Category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdDelete$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiCategoryIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdDelete$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryIdDelete$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiCategoryIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdDelete$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, CategoryService.ApiCategoryIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiCategoryIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiCategoryIdDelete$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiCategoryIdDelete$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

}
