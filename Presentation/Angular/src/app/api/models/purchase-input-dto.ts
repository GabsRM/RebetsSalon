/* tslint:disable */
/* eslint-disable */
import { PurchaseDetailInputDto } from './purchase-detail-input-dto';
export interface PurchaseInputDto {
  branchId?: null | string;
  date: string;
  detail: Array<PurchaseDetailInputDto>;
  discount: number;
  subtotal: number;
  supplierId?: null | string;
  supplierInvoiceId: string;
  tax: number;
}
