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
import { PurchaseDtoListResult } from '../models/purchase-dto-list-result';
import { PurchaseDtoResult } from '../models/purchase-dto-result';
import { PurchaseInputDto } from '../models/purchase-input-dto';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPurchaseGet
   */
  static readonly ApiPurchaseGetPath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PurchaseDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<PurchaseDtoListResult> {

    return this.apiPurchaseGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<PurchaseDtoListResult>) => r.body as PurchaseDtoListResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PurchaseDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseGet$Json(params?: {
  },
  context?: HttpContext

): Observable<PurchaseDtoListResult> {

    return this.apiPurchaseGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<PurchaseDtoListResult>) => r.body as PurchaseDtoListResult)
    );
  }

  /**
   * Path part for operation apiPurchasePost
   */
  static readonly ApiPurchasePostPath = '/api/Purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Plain$Response(params: {
    body: PurchaseInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPurchasePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Plain(params: {
    body: PurchaseInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiPurchasePost$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchasePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Json$Response(params: {
    body: PurchaseInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchasePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPurchasePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPurchasePost$Json(params: {
    body: PurchaseInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiPurchasePost$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiPurchaseIdGet
   */
  static readonly ApiPurchaseIdGetPath = '/api/Purchase/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PurchaseDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdGetPath, 'get');
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
        return r as StrictHttpResponse<PurchaseDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<PurchaseDtoResult> {

    return this.apiPurchaseIdGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<PurchaseDtoResult>) => r.body as PurchaseDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PurchaseDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdGetPath, 'get');
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
        return r as StrictHttpResponse<PurchaseDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiPurchaseIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdGet$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<PurchaseDtoResult> {

    return this.apiPurchaseIdGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<PurchaseDtoResult>) => r.body as PurchaseDtoResult)
    );
  }

  /**
   * Path part for operation apiPurchaseIdDelete
   */
  static readonly ApiPurchaseIdDeletePath = '/api/Purchase/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdDelete$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiPurchaseIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdDelete$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiPurchaseIdDelete$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPurchaseIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdDelete$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, PurchaseService.ApiPurchaseIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiPurchaseIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPurchaseIdDelete$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiPurchaseIdDelete$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

}
