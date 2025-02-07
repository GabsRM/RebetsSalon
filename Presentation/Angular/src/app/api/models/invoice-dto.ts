/* tslint:disable */
/* eslint-disable */
import { InvoiceBranchDto } from './invoice-branch-dto';
import { InvoiceDetailDto } from './invoice-detail-dto';
export interface InvoiceDto {
  active?: boolean;
  branch?: InvoiceBranchDto;
  date?: string;
  details?: null | Array<InvoiceDetailDto>;
  discount?: number;
  invoiceId?: null | string;
  subtotal?: number;
  tax?: number;
  total?: number;
}
