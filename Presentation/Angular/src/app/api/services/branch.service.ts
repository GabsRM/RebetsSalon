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
import { BranchDtoListResult } from '../models/branch-dto-list-result';
import { BranchDtoResult } from '../models/branch-dto-result';
import { BranchInputDto } from '../models/branch-input-dto';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiBranchGet
   */
  static readonly ApiBranchGetPath = '/api/Branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BranchDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BranchDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBranchGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<BranchDtoListResult> {

    return this.apiBranchGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BranchDtoListResult>) => r.body as BranchDtoListResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BranchDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BranchDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBranchGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchGet$Json(params?: {
  },
  context?: HttpContext

): Observable<BranchDtoListResult> {

    return this.apiBranchGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BranchDtoListResult>) => r.body as BranchDtoListResult)
    );
  }

  /**
   * Path part for operation apiBranchPost
   */
  static readonly ApiBranchPostPath = '/api/Branch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchPost$Plain$Response(params: {
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiBranchPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchPost$Plain(params: {
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchPost$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchPost$Json$Response(params: {
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiBranchPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchPost$Json(params: {
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchPost$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiBranchIdGet
   */
  static readonly ApiBranchIdGetPath = '/api/Branch/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdGet$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BranchDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdGetPath, 'get');
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
        return r as StrictHttpResponse<BranchDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBranchIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdGet$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BranchDtoResult> {

    return this.apiBranchIdGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BranchDtoResult>) => r.body as BranchDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdGet$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BranchDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdGetPath, 'get');
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
        return r as StrictHttpResponse<BranchDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiBranchIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdGet$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BranchDtoResult> {

    return this.apiBranchIdGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BranchDtoResult>) => r.body as BranchDtoResult)
    );
  }

  /**
   * Path part for operation apiBranchIdPut
   */
  static readonly ApiBranchIdPutPath = '/api/Branch/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchIdPut$Plain$Response(params: {
    id: string;
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiBranchIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchIdPut$Plain(params: {
    id: string;
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchIdPut$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchIdPut$Json$Response(params: {
    id: string;
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiBranchIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiBranchIdPut$Json(params: {
    id: string;
    body: BranchInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchIdPut$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiBranchIdDelete
   */
  static readonly ApiBranchIdDeletePath = '/api/Branch/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdDelete$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiBranchIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdDelete$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchIdDelete$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiBranchIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdDelete$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, BranchService.ApiBranchIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiBranchIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiBranchIdDelete$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiBranchIdDelete$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

}
