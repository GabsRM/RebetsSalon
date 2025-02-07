/* tslint:disable */
/* eslint-disable */
import { BranchProductDto } from './branch-product-dto';
export interface BranchDto {
  address?: null | string;
  branchId?: null | string;
  name?: null | string;
  phone?: null | string;
  productsInBranch?: null | Array<BranchProductDto>;
}
