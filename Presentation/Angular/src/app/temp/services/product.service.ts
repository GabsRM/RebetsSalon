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
import { ProductAvailableDtoListResult } from '../models/product-available-dto-list-result';
import { ProductDtoListResult } from '../models/product-dto-list-result';
import { ProductDtoResult } from '../models/product-dto-result';
import { ProductInputDto } from '../models/product-input-dto';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiProductGet()` */
  static readonly ApiProductGetPath = '/api/Product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<ProductDtoListResult> {
    return this.apiProductGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoListResult>): ProductDtoListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<ProductDtoListResult> {
    return this.apiProductGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoListResult>): ProductDtoListResult => r.body)
    );
  }

  /** Path part for operation `apiProductPost()` */
  static readonly ApiProductPostPath = '/api/Product';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductPost$Plain$Response(
    params: {
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiProductPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductPost$Plain(
    params: {
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductPost$Json$Response(
    params: {
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiProductPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductPost$Json(
    params: {
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiProductIdGet()` */
  static readonly ApiProductIdGetPath = '/api/Product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdGet$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdGet$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ProductDtoResult> {
    return this.apiProductIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoResult>): ProductDtoResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdGet$Json$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdGet$Json(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<ProductDtoResult> {
    return this.apiProductIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoResult>): ProductDtoResult => r.body)
    );
  }

  /** Path part for operation `apiProductIdPut()` */
  static readonly ApiProductIdPutPath = '/api/Product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdPut$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductIdPut$Plain$Response(
    params: {
      id: string;
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiProductIdPut$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductIdPut$Plain(
    params: {
      id: string;
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductIdPut$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdPut$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductIdPut$Json$Response(
    params: {
      id: string;
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {"style":"simple"});
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
   * To access the full response (for headers, for example), `apiProductIdPut$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiProductIdPut$Json(
    params: {
      id: string;
      body: ProductInputDto
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductIdPut$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiProductIdDelete()` */
  static readonly ApiProductIdDeletePath = '/api/Product/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdDelete$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiProductIdDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdDelete$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductIdDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductIdDelete$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdDelete$Json$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<BaseResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiProductIdDelete$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductIdDelete$Json(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<BaseResult> {
    return this.apiProductIdDelete$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<BaseResult>): BaseResult => r.body)
    );
  }

  /** Path part for operation `apiProductByTypeTypeGet()` */
  static readonly ApiProductByTypeTypeGetPath = '/api/ProductByType/{type}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductByTypeTypeGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductByTypeTypeGet$Plain$Response(
    params: {
      type: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductByTypeTypeGetPath, 'get');
    if (params) {
      rb.path('type', params.type, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductByTypeTypeGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductByTypeTypeGet$Plain(
    params: {
      type: string;
    },
    context?: HttpContext
  ): Observable<ProductDtoListResult> {
    return this.apiProductByTypeTypeGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoListResult>): ProductDtoListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductByTypeTypeGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductByTypeTypeGet$Json$Response(
    params: {
      type: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductByTypeTypeGetPath, 'get');
    if (params) {
      rb.path('type', params.type, {"style":"simple"});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductByTypeTypeGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductByTypeTypeGet$Json(
    params: {
      type: string;
    },
    context?: HttpContext
  ): Observable<ProductDtoListResult> {
    return this.apiProductByTypeTypeGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductDtoListResult>): ProductDtoListResult => r.body)
    );
  }

  /** Path part for operation `apiProductAvailableGet()` */
  static readonly ApiProductAvailableGetPath = '/api/Product/Available';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductAvailableGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductAvailableGet$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductAvailableDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductAvailableGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductAvailableDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductAvailableGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductAvailableGet$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<ProductAvailableDtoListResult> {
    return this.apiProductAvailableGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductAvailableDtoListResult>): ProductAvailableDtoListResult => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiProductAvailableGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductAvailableGet$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<ProductAvailableDtoListResult>> {
    const rb = new RequestBuilder(this.rootUrl, ProductService.ApiProductAvailableGetPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProductAvailableDtoListResult>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiProductAvailableGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiProductAvailableGet$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<ProductAvailableDtoListResult> {
    return this.apiProductAvailableGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductAvailableDtoListResult>): ProductAvailableDtoListResult => r.body)
    );
  }

}
