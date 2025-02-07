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
import { SupplierDtoListResult } from '../models/supplier-dto-list-result';
import { SupplierDtoResult } from '../models/supplier-dto-result';
import { SupplierInputDto } from '../models/supplier-input-dto';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiSupplierGet
   */
  static readonly ApiSupplierGetPath = '/api/Supplier';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierGet$Plain$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SupplierDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSupplierGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierGet$Plain(params?: {
  },
  context?: HttpContext

): Observable<SupplierDtoListResult> {

    return this.apiSupplierGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SupplierDtoListResult>) => r.body as SupplierDtoListResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierGet$Json$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SupplierDtoListResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSupplierGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierGet$Json(params?: {
  },
  context?: HttpContext

): Observable<SupplierDtoListResult> {

    return this.apiSupplierGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SupplierDtoListResult>) => r.body as SupplierDtoListResult)
    );
  }

  /**
   * Path part for operation apiSupplierPost
   */
  static readonly ApiSupplierPostPath = '/api/Supplier';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierPost$Plain$Response(params: {
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSupplierPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierPost$Plain(params: {
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierPost$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierPost$Json$Response(params: {
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSupplierPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierPost$Json(params: {
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierPost$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiSupplierIdGet
   */
  static readonly ApiSupplierIdGetPath = '/api/Supplier/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdGet$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SupplierDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdGetPath, 'get');
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
        return r as StrictHttpResponse<SupplierDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSupplierIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdGet$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<SupplierDtoResult> {

    return this.apiSupplierIdGet$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<SupplierDtoResult>) => r.body as SupplierDtoResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdGet$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SupplierDtoResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdGetPath, 'get');
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
        return r as StrictHttpResponse<SupplierDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiSupplierIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdGet$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<SupplierDtoResult> {

    return this.apiSupplierIdGet$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<SupplierDtoResult>) => r.body as SupplierDtoResult)
    );
  }

  /**
   * Path part for operation apiSupplierIdPut
   */
  static readonly ApiSupplierIdPutPath = '/api/Supplier/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierIdPut$Plain$Response(params: {
    id: string;
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSupplierIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierIdPut$Plain(params: {
    id: string;
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierIdPut$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierIdPut$Json$Response(params: {
    id: string;
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSupplierIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSupplierIdPut$Json(params: {
    id: string;
    body: SupplierInputDto
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierIdPut$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * Path part for operation apiSupplierIdDelete
   */
  static readonly ApiSupplierIdDeletePath = '/api/Supplier/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdDelete$Plain$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiSupplierIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdDelete$Plain(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierIdDelete$Plain$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSupplierIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdDelete$Json$Response(params: {
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<BaseResult>> {

    const rb = new RequestBuilder(this.rootUrl, SupplierService.ApiSupplierIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiSupplierIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSupplierIdDelete$Json(params: {
    id: string;
  },
  context?: HttpContext

): Observable<BaseResult> {

    return this.apiSupplierIdDelete$Json$Response(params,context).pipe(
      map((r: StrictHttpResponse<BaseResult>) => r.body as BaseResult)
    );
  }

}
