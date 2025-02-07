/* tslint:disable */
/* eslint-disable */
import { InvoiceDetailInputDto } from './invoice-detail-input-dto';
export interface InvoiceInputDto {
  details?: null | Array<InvoiceDetailInputDto>;
  discount: number;
}
