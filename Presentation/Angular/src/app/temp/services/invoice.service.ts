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
import { BestSellingProductListResult } from '../models/best-selling-product-list-result';
import { InvoiceDtoListResult } from '../models/invoice-dto-list-result';
import { InvoiceDtoResult } from '../models/invoice-dto-result';
import { InvoiceInputDto } from '../models/invoice-input-dto';
import { InvoicePerMonthListResult } from '../models/invoice-per-month-list-result';
import { InvoiceTypeCountPerMonthListResult } from '../models/invoice-type-count-per-month-list-result';

@Injectable({ providedIn: 'root' })
export class InvoiceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiInvoiceGet()` */
  static readonly ApiInvoiceGetPath = '/api/Invoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoiceDtoListResult> {
    return this.apiInvoiceGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceDtoListResult>): InvoiceDtoListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoiceDtoListResult> {
    return this.apiInvoiceGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceDtoListResult>): InvoiceDtoListResult => r.body)
    );
  }

  /** Path part for operation `apiInvoicePost()` */
  static readonly ApiInvoicePostPath = '/api/Invoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoicePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiInvoicePost$Plain$Response(
    params: {
      body: InvoiceInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoicePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiInvoicePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiInvoicePost$Plain(
    params: {
      body: InvoiceInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiInvoicePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoicePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiInvoicePost$Json$Response(
    params: {
      body: InvoiceInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoicePostPath, 'post');
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
   * To access the full response (for headers, for example), `apiInvoicePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiInvoicePost$Json(
    params: {
      body: InvoiceInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiInvoicePost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiInvoiceIdGet()` */
  static readonly ApiInvoiceIdGetPath = '/api/Invoice/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdGet$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdGet$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<InvoiceDtoResult> {
    return this.apiInvoiceIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceDtoResult>): InvoiceDtoResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdGet$Json$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdGet$Json(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<InvoiceDtoResult> {
    return this.apiInvoiceIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceDtoResult>): InvoiceDtoResult => r.body)
    );
  }

  /** Path part for operation `apiInvoiceIdDelete()` */
  static readonly ApiInvoiceIdDeletePath = '/api/Invoice/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdDelete$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiInvoiceIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdDelete$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiInvoiceIdDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdDelete$Json$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiInvoiceIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceIdDelete$Json(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiInvoiceIdDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiInvoicePerMonthGet()` */
  static readonly ApiInvoicePerMonthGetPath = '/api/Invoice/PerMonth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoicePerMonthGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoicePerMonthGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoicePerMonthListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoicePerMonthGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoicePerMonthListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoicePerMonthGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoicePerMonthGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoicePerMonthListResult> {
    return this.apiInvoicePerMonthGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicePerMonthListResult>): InvoicePerMonthListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoicePerMonthGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoicePerMonthGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoicePerMonthListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoicePerMonthGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoicePerMonthListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoicePerMonthGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoicePerMonthGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoicePerMonthListResult> {
    return this.apiInvoicePerMonthGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoicePerMonthListResult>): InvoicePerMonthListResult => r.body)
    );
  }

  /** Path part for operation `apiInvoiceTypePerMonthGet()` */
  static readonly ApiInvoiceTypePerMonthGetPath = '/api/Invoice/TypePerMonth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceTypePerMonthGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceTypePerMonthGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceTypeCountPerMonthListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceTypePerMonthGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceTypeCountPerMonthListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceTypePerMonthGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceTypePerMonthGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoiceTypeCountPerMonthListResult> {
    return this.apiInvoiceTypePerMonthGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceTypeCountPerMonthListResult>): InvoiceTypeCountPerMonthListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceTypePerMonthGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceTypePerMonthGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<InvoiceTypeCountPerMonthListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceTypePerMonthGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceTypeCountPerMonthListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceTypePerMonthGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceTypePerMonthGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<InvoiceTypeCountPerMonthListResult> {
    return this.apiInvoiceTypePerMonthGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<InvoiceTypeCountPerMonthListResult>): InvoiceTypeCountPerMonthListResult => r.body)
    );
  }

  /** Path part for operation `apiInvoiceBestSellingsGet()` */
  static readonly ApiInvoiceBestSellingsGetPath = '/api/Invoice/BestSellings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceBestSellingsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceBestSellingsGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BestSellingProductListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceBestSellingsGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BestSellingProductListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceBestSellingsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceBestSellingsGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<BestSellingProductListResult> {
    return this.apiInvoiceBestSellingsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BestSellingProductListResult>): BestSellingProductListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiInvoiceBestSellingsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceBestSellingsGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BestSellingProductListResult>> {
    const rb = new RequestBuilder(this.rootUrl, InvoiceService.ApiInvoiceBestSellingsGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BestSellingProductListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiInvoiceBestSellingsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiInvoiceBestSellingsGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<BestSellingProductListResult> {
    return this.apiInvoiceBestSellingsGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BestSellingProductListResult>): BestSellingProductListResult => r.body)
    );
  }

}
