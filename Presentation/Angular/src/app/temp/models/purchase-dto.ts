/* tslint:disable */
/* eslint-disable */
import { PurchaseDetailDto } from './purchase-detail-dto';
import { SupplierDto } from './supplier-dto';
export interface PurchaseDto {
  active?: boolean;
  date?: string;
  detail?: null | Array<PurchaseDetailDto>;
  discount?: number;
  purchaseId?: null | string;
  subtotal?: number;
  supplier?: SupplierDto;
  supplierInvoiceId?: null | string;
  tax?: number;
}
