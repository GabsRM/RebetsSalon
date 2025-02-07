/* tslint:disable */
/* eslint-disable */
import { ProductBranchDto } from './product-branch-dto';
export interface ProductDto {
  barcode?: null | string;
  categories?: null | Array<string>;
  description?: null | string;
  localStock?: number;
  minStock?: null | number;
  price?: number;
  productId?: null | string;
  productPerBranch?: null | Array<ProductBranchDto>;
  totalStock?: number;
  type?: null | string;
}
